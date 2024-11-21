import { PrismaClient  } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  // ... you will write your Prisma Client queries here
  await prisma.user.create({
    data: {
      email: "xyz@xyz.com",
      name: "xyz"
    }
  });
  
}

main()
  .then(async () => {
    console.log("Query done mast badiya");
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
