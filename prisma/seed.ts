import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.uOM.createMany({
    data: [
      { name: "Pieces", code: "PCS" },
      { name: "Bundles", code: "BDL" },
      { name: "Carton", code: "CTN" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ UOM seeding completed");
}

main()
  .catch((err) => {
    console.error("❌ Seed error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
