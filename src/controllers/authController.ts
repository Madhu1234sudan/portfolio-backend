import crypto from "crypto";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // console.log("LOGIN BODY:", req.body);
    if (!email?.trim()) {
       console.log("Email validation failed");
      return res.status(400).json({
        message: "Email is required.",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      //  console.log("Email format failed");
      return res.status(400).json({
        message: "Invalid email format.",
      });
    }

    if (!password?.trim()) {
      //  console.log("Password validation failed");
      return res.status(400).json({
        message: "Password is required.",
      });
    }
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured.");
    }
    const token = jwt.sign(
      {
        adminId: admin.id,
        email: admin.email,
      },
      jwtSecret,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const getCurrentAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: req.admin.adminId,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    return res.status(200).json(admin);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email?.trim()) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format.",
      });
    }
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 15);

    await prisma.admin.update({
      where: {
        id: admin.id,
      },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });
    const resetLink = `${process.env.FRONTEND_URL}/admin/reset-password?token=${resetToken}`;

    await sendEmail(
      admin.email,
      "Password Reset Request",
      `
    <h2>Password Reset</h2>

    <p>Click the link below to reset your password:</p>

    <a href="${resetLink}">
      Reset Password
    </a>

    <p>This link expires in 15 minutes.</p>
  `,
    );

    return res.status(200).json({
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    if (!token?.trim()) {
      return res.status(400).json({
        message: "Reset token is required.",
      });
    }

    if (!newPassword?.trim()) {
      return res.status(400).json({
        message: "New password is required.",
      });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }
    const admin = await prisma.admin.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: {
        id: admin.id,
      },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
