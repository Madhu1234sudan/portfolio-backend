import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email =
      process.env.ADMIN_EMAIL;

    const password =
      process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "ADMIN_EMAIL or ADMIN_PASSWORD missing in .env"
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin =
      await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

    console.log(
      "Admin created successfully:",
      admin.email
    );

  } catch (error) {
    console.error(error);

  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();