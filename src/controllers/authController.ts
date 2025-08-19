// controllers/authController.ts
import { Request, Response } from "express";
import prisma from "../prismaClient.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, passwordHash }
  });

  res.status(201).json({ message: 'User registered', user: { id: user.id, email: user.email } });
}

export const login =  async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

  res.json({ token });
}