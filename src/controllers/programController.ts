import { Request, Response } from 'express';
import prisma from '../prismaClient.js';

interface CreateProgramBody {
  name: string;
  description: string;
}

export const createProgram = async (req: Request<unknown, unknown, CreateProgramBody>, res: Response): Promise<void> => {
  const { name, description } = req.body;
  try {
    const program = await prisma.program.create({
      data: { name, description },
    });
    res.json(program);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};

export const getPrograms = async (req: Request, res: Response): Promise<void> => {
  try {
    const programs = await prisma.program.findMany({
      include: { days: true },
    });
    res.json(programs);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};
