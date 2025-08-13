// prisma/seed.ts
import prisma from '../src/prismaClient.js'; // Adjust the import path as necessary

async function main() {
  // --- Users ---
  const userEmail = 'ttggwll@gmail.com';
  let user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Theo',
        email: userEmail,
        password: 'password123', // Hash in production!
      },
    });
    console.log(`Created user: ${user.email}`);
  }

  // --- Programs ---
  const programsData = [
    {
      name: 'Beginner Fitness',
      description: '4-week starter program',
      durationWeeks: 4,
      difficulty: 'Beginner',
    },
    {
      name: 'Intermediate Fitness',
      description: '6-week progressive program',
      durationWeeks: 6,
      difficulty: 'Intermediate',
    },
  ];

  for (const p of programsData) {
    let program = await prisma.program.findFirst({ where: { name: p.name } });
    if (!program) {
      program = await prisma.program.create({ data: p });
      console.log(`Created program: ${program.name}`);
    }

    // --- Program Days ---
    for (let i = 1; i <= (program.durationWeeks ?? 4) * 3; i++) { // 3 workouts per week
      const day = await prisma.programDay.create({
        data: {
          dayNumber: i,
          description: `Day ${i} workout`,
          programId: program.id,
        },
      });

      // --- Exercises ---
      await prisma.exercise.createMany({
        data: [
          {
            name: 'Push Ups',
            sets: 3,
            reps: 12,
            restSeconds: 60,
            programDayId: day.id,
          },
          {
            name: 'Squats',
            sets: 3,
            reps: 15,
            restSeconds: 60,
            programDayId: day.id,
          },
        ],
      });
    }
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
