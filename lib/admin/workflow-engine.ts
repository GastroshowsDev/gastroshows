import { prisma } from "@/lib/prisma";
import { addDays } from "date-fns";

/**
 * Dispara los flujos de automatización configurados para un evento específico.
 */
export async function triggerWorkflows(trigger: string, reservationId: string) {
  try {
    const activeWorkflows = await prisma.workflow.findMany({
      where: { trigger, active: true }
    });

    for (const workflow of activeWorkflows) {
      const steps = workflow.steps as any[];
      if (steps.length === 0) continue;

      // Iniciar ejecución
      await prisma.workflowExecution.create({
        data: {
          workflowId: workflow.id,
          reservationId: reservationId,
          currentStep: 0,
          status: "RUNNING",
          nextStepAt: new Date(), // Empezar inmediatamente
        }
      });
    }
  } catch (err) {
    console.error("[workflow-engine] trigger error:", err);
  }
}

/**
 * Procesa los pasos pendientes de todas las ejecuciones activas.
 * Se debería llamar desde un cron job cada pocos minutos.
 */
export async function processWorkflowExecutions() {
  const now = new Date();
  
  const activeExecutions = await prisma.workflowExecution.findMany({
    where: {
      status: "RUNNING",
      nextStepAt: { lte: now }
    },
    include: {
      workflow: true,
      reservation: {
        include: { event: true }
      }
    }
  });

  for (const exec of activeExecutions) {
    const steps = exec.workflow.steps as any[];
    const currentStep = steps[exec.currentStep];

    if (!currentStep) {
      await prisma.workflowExecution.update({
        where: { id: exec.id },
        data: { status: "COMPLETED" }
      });
      continue;
    }

    try {
      if (currentStep.type === "email") {
        // Encolar email
        await prisma.emailQueue.create({
          data: {
            reservationId: exec.reservationId,
            templateKey: currentStep.templateKey,
            scheduledAt: new Date(),
          }
        });
        
        // Avanzar al siguiente paso inmediatamente (o esperar si hay delay)
        await advanceWorkflow(exec, steps);
      } 
      else if (currentStep.type === "wait") {
        // El paso de espera simplemente actualiza el 'nextStepAt' para el SIGUIENTE paso
        // Pero el paso ACTUAL es la espera, así que avanzamos
        await advanceWorkflow(exec, steps, currentStep.delayDays || 0);
      }
    } catch (err) {
      console.error(`[workflow-engine] Error processing step ${exec.currentStep} for exec ${exec.id}:`, err);
    }
  }
}

async function advanceWorkflow(exec: any, steps: any[], extraDelayDays = 0) {
  const nextStepIdx = exec.currentStep + 1;
  
  if (nextStepIdx >= steps.length) {
    await prisma.workflowExecution.update({
      where: { id: exec.id },
      data: { status: "COMPLETED", currentStep: nextStepIdx }
    });
  } else {
    // Si el paso actual era un 'wait', el delay se aplica ahora.
    // Si el paso actual era un 'email', avanzamos al siguiente.
    await prisma.workflowExecution.update({
      where: { id: exec.id },
      data: { 
        currentStep: nextStepIdx,
        nextStepAt: addDays(new Date(), extraDelayDays)
      }
    });
  }
}
