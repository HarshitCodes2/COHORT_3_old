import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  // ... you will write your Prisma Client queries here
  await prisma.post.create({
    data: {
      title: "Post-4",
      content: "Temporary content user 3",
      published: true,
      authorId: 2
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
  