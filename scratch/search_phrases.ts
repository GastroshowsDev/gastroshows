import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Searching for "Experiencias únicas"...');
  const landing1 = await prisma.landingContent.findMany({
    where: { value: { contains: 'Experiencias únicas', mode: 'insensitive' } }
  });
  console.log('LandingContent:', landing1);

  const blocks1 = await prisma.pageBlock.findMany({
    where: { content: { path: ['title'], equals: 'Experiencias únicas' } }
  });
  console.log('PageBlock (title):', blocks1);

  const blocks2 = await prisma.pageBlock.findMany({
    where: { content: { path: ['body'], contains: 'Experiencias únicas' } }
  });
  console.log('PageBlock (body):', blocks2);

  console.log('\nSearching for "que une a cualquier equipo"...');
  const landing2 = await prisma.landingContent.findMany({
    where: { value: { contains: 'que une a cualquier equipo', mode: 'insensitive' } }
  });
  console.log('LandingContent:', landing2);

  const blocks3 = await prisma.pageBlock.findMany({
    where: { content: { path: ['body'], contains: 'que une a cualquier equipo' } }
  });
  console.log('PageBlock (body):', blocks3);
}

main().catch(console.error);
