import { Request, Response } from 'express';
import prisma from '../prismaClient.js';

// Define the expected body type for creating a user
interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

// Create a new user
export const createUser = async (req: Request<unknown, unknown, CreateUserBody>, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};
