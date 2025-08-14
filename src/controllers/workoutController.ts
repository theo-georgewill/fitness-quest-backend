import { Request, Response } from 'express';
import prisma from '../prismaClient.js';

export const getWorkoutsByDay = async (req: Request, res: Response) => {
  const programDayId = Number(req.params.programDayId);

  try {
    const workouts = await prisma.workout.findMany({
      where: { programDayId },
      include: { exercise: true },
    });

    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createWorkout = async (req: Request, res: Response) => {
  const { programDayId, exercises } = req.body;

  try {
    const workout = await prisma.workout.create({
      data: {
        programDayId,
        exercises: {
          create: exercises,
        },
      },
    });

    res.status(201).json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

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
