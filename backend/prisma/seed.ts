import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const DEV_USER_ID = "dev-user";

async function main() {
  // Create dev user with hashed password
  const passwordHash = await bcrypt.hash("password123", 10);
  await prisma.user.upsert({
    where: { id: DEV_USER_ID },
    create: {
      id: DEV_USER_ID,
      email: "dev@miora.local",
      name: "Developer",
      passwordHash,
    },
    update: { passwordHash },
  });

  // Create default settings
  await prisma.settings.upsert({
    where: { userId: DEV_USER_ID },
    create: { userId: DEV_USER_ID, thoughtCooldown: "5m" },
    update: {},
  });

  // Create seed people
  const people = [
    { name: "Deepthi", nickname: "Deepu" },
    { name: "James", nickname: "Jim" },
    { name: "Jennie", nickname: "Jen" },
    { name: "Brian S", nickname: "Bri" },
    { name: "Roës", nickname: "Rose" },
  ];

  for (const p of people) {
    await prisma.person.upsert({
      where: { id: `seed-${p.name.toLowerCase().replace(/\s+/g, "-")}` },
      create: {
        id: `seed-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
        userId: DEV_USER_ID,
        name: p.name,
        nickname: p.nickname,
      },
      update: {},
    });
  }

  console.log("Seed data created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
