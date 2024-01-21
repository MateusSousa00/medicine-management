import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  //Creating first user...
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: 'password',
    },
  });
  console.log(admin);
  //Created.
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
