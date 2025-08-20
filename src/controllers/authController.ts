// controllers/authController.ts
import type { Request, Response } from "express";
import prisma from "../prismaClient.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
  //get email and password from request body
  const { email, password } = req.body;

  //verify user does not exist
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  //hash password
  const passwordHash = await bcrypt.hash(password, 10);

  //create user
  const user = await prisma.user.create({
    data: { email, passwordHash }
  });

  //check if user was created
  if (!user) return res.status(500).json({ message: 'User registration failed' });

  //respond with user info
  res.status(201).json({ message: 'User registered', user: { id: user.id, email: user.email } });
}

export const login =  async (req: Request, res: Response) => {
  //get email and password from request body
  const { email, password } = req.body;

  //find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  //check password
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

  //create JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

  //respond with token
  res.json({ token });
}