import prisma from '../prismaClient.js';

// Create a Program Day
export const createProgramDay = async (req, res) => {
  const { programId, title, dayNumber } = req.body;
  try {
    const day = await prisma.programDay.create({
      data: { programId, title, dayNumber },
    });
    res.json(day);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Program Days for a Program
export const getProgramDays = async (req, res) => {
  const { programId } = req.params;
  try {
    const days = await prisma.programDay.findMany({
      where: { programId: Number(programId) },
      include: { exercises: true },
    });
    res.json(days);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create an Exercise for a Program Day
export const createExercise = async (req, res) => {
  const { programDayId, name, description, sets, reps } = req.body;
  try {
    const exercise = await prisma.exercise.create({
      data: { programDayId, name, description, sets, reps },
    });
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Log a workout completion
export const logWorkout = async (req, res) => {
  const { userId, programDayId, completedAt } = req.body;
  try {
    const log = await prisma.workoutLog.create({
      data: { userId, programDayId, completedAt: completedAt || new Date() },
    });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
