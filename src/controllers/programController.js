import prisma from '../prismaClient.js';

export const createProgram = async (req, res) => {
  const { title, description } = req.body;
  try {
    const program = await prisma.program.create({
      data: { title, description },
    });
    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPrograms = async (req, res) => {
  try {
    const programs = await prisma.program.findMany({
      include: { programDays: true },
    });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
