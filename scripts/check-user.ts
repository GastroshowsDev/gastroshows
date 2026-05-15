import { prisma } from "@/lib/prisma";

async function main() {
  const users = await prisma.user.findMany();
  console.log("Users in DB:", users.map(u => ({ email: u.email, role: u.role })));
  
  const marc = await prisma.user.findUnique({
    where: { email: "marc@gastroshows.es" }
  });
  console.log("User Marc:", marc ? "Found" : "Not Found");
}

main().catch(console.error);
