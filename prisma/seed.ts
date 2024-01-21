import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  //Criando o primeiro usuario
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: 'password',
    },
  });
  console.log(admin);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
