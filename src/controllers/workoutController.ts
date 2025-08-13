import { Request, Response } from 'express';
import prisma from '../prismaClient.js';

export const getTodayWorkout = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    // Get the first enrolled program and today's day
    const enrollment = await prisma.enrollment.findFirst({
      where: { userId },
      include: { program: { include: { days: { include: { exercises: true } } } } },
      orderBy: { startedAt: 'asc' },
    });

    if (!enrollment) return res.status(404).json({ message: 'No enrollment found' });

    // For simplicity, just return the first program day
    const todayWorkout = enrollment.program.days[0];
    res.json(todayWorkout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
