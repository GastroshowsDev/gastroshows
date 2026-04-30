import { prisma } from "@/lib/prisma";
import { addDays } from "date-fns";

export async function triggerWorkflows(trigger: string, reservationId: string) {
  try {
    const activeWorkflows = await prisma.workflow.findMany({
      where: { trigger, active: true },
    });

    for (const workflow of activeWorkflows) {
      const steps = workflow.steps as any[];
      if (steps.length === 0) continue;

      await prisma.workflowExecution.create({
        data: {
          workflowId: workflow.id,
          reservationId,
          currentStep: 0,
          status: "RUNNING",
          nextStepAt: new Date(),
        },
      });
    }
  } catch (err) {
    console.error("[workflow-engine] trigger error:", err);
  }
}

export async function processWorkflowExecutions() {
  const now = new Date();

  const activeExecutions = await prisma.workflowExecution.findMany({
    where: {
      status: "RUNNING",
      nextStepAt: { lte: now },
    },
    include: {
      workflow: true,
      reservation: {
        include: { event: true, venue: true, customer: true },
      },
    },
  });

  for (const exec of activeExecutions) {
    const steps = exec.workflow.steps as any[];
    const step = steps[exec.currentStep];

    if (!step) {
      await prisma.workflowExecution.update({
        where: { id: exec.id },
        data: { status: "COMPLETED" },
      });
      continue;
    }

    try {
      switch (step.type) {
        case "email": {
          if (step.templateKey) {
            await prisma.emailQueue.create({
              data: {
                reservationId: exec.reservationId,
                templateKey: step.templateKey,
                scheduledAt: new Date(),
              },
            });
          }
          await advanceStep(exec, steps);
          break;
        }

        case "wait": {
          await advanceStep(exec, steps, addDays(now, step.delayDays ?? 0));
          break;
        }

        // Waits until N days before the event date (absolute target, not relative delay)
        case "waitUntilRelative": {
          const eventDate = exec.reservation.event?.date ?? exec.reservation.visitDate;
          if (!eventDate) {
            await advanceStep(exec, steps);
            break;
          }
          const days = step.daysBeforeEvent ?? 0;
          const target = new Date(eventDate);
          target.setDate(target.getDate() - days);
          target.setUTCHours(9, 0, 0, 0); // 9:00 UTC = ~10-11 Spain
          // If target is already in the past, fire immediately
          await advanceStep(exec, steps, target > now ? target : now);
          break;
        }

        // Sends venue-specific template; retries every 6h if no venue is yet assigned
        case "venueEmail": {
          const venue = exec.reservation.venue;
          if (!venue) {
            const eventDate = exec.reservation.event?.date;
            const eventPassed = !eventDate || now >= new Date(eventDate);
            if (eventPassed) {
              console.warn(`[workflow-engine] venueEmail skipped — event past, no venue (exec ${exec.id})`);
              await advanceStep(exec, steps);
            } else {
              // Retry in 6 hours — admin may assign venue before D-3
              await prisma.workflowExecution.update({
                where: { id: exec.id },
                data: { nextStepAt: new Date(now.getTime() + 6 * 60 * 60 * 1000) },
              });
            }
            break;
          }
          const templateKey =
            venue.name === "BERTRAND" ? step.bertrandKey : step.urgellKey;
          if (templateKey) {
            await prisma.emailQueue.create({
              data: {
                reservationId: exec.reservationId,
                templateKey,
                scheduledAt: new Date(),
              },
            });
          }
          await advanceStep(exec, steps);
          break;
        }

        default:
          await advanceStep(exec, steps);
      }
    } catch (err) {
      console.error(
        `[workflow-engine] Error on step ${exec.currentStep} for exec ${exec.id}:`,
        err,
      );
    }
  }
}

async function advanceStep(exec: any, steps: any[], nextAt: Date = new Date()) {
  const next = exec.currentStep + 1;
  if (next >= steps.length) {
    await prisma.workflowExecution.update({
      where: { id: exec.id },
      data: { status: "COMPLETED", currentStep: next },
    });
  } else {
    await prisma.workflowExecution.update({
      where: { id: exec.id },
      data: { currentStep: next, nextStepAt: nextAt },
    });
  }
}
