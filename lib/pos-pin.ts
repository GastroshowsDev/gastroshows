import { prisma } from "@/lib/prisma";

// Código de sesión TPV del usuario = PIN de su empleado vinculado (decisión feature #13).
// - pin de 4 dígitos → crea o actualiza el empleado vinculado al usuario.
// - pin vacío → desvincula (el empleado se conserva por su historial de fichaje).
// Lanza Error con mensaje listo para mostrar si el PIN no es válido o está en uso.
export async function setUserPosPin(userId: string, userName: string, pin: string | null | undefined): Promise<string | null> {
  const code = (pin ?? "").replace(/\D/g, "");

  const current = await prisma.employee.findUnique({
    where: { userId },
    select: { id: true, pin: true },
  });

  if (!code) {
    if (current) {
      await prisma.employee.update({ where: { id: current.id }, data: { userId: null } });
    }
    return null;
  }

  if (!/^\d{4}$/.test(code)) {
    throw new Error("El código TPV debe tener 4 dígitos");
  }
  if (current?.pin === code) return code;

  const clash = await prisma.employee.findUnique({ where: { pin: code }, select: { id: true, userId: true } });
  if (clash && clash.id !== current?.id) {
    throw new Error("Ese código ya está en uso por otro empleado");
  }

  if (current) {
    await prisma.employee.update({ where: { id: current.id }, data: { pin: code } });
  } else {
    await prisma.employee.create({ data: { name: userName, pin: code, userId } });
  }
  return code;
}

export async function getUserPosPin(userId: string): Promise<string | null> {
  const emp = await prisma.employee.findUnique({ where: { userId }, select: { pin: true } });
  return emp?.pin ?? null;
}
