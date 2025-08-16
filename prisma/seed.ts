import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // hash passwords
  const passwordHash = await bcrypt.hash('password123', 10)

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      name: 'John Doe',
      passwordHash,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      name: 'Jane Smith',
      passwordHash,
    },
  })

  // Create Exercises
  const pushUps = await prisma.exercise.create({
    data: {
      name: 'Push-ups',
      description: 'Do 10 push-ups',
      targetMuscles: 'chest,triceps,shoulders',
    },
  })

  const squats = await prisma.exercise.create({
    data: {
      name: 'Squats',
      description: 'Do 15 bodyweight squats',
      targetMuscles: 'quads,glutes',
    },
  })

  const plank = await prisma.exercise.create({
    data: {
      name: 'Plank',
      description: 'Hold for 30 seconds',
      targetMuscles: 'core',
    },
  })

  // Create a Program with Days & Workouts
  const program = await prisma.program.create({
    data: {
      title: 'Beginner Fitness Program',
      description: 'A simple starter program for new users.',
      days: {
        create: [
          {
            dayNumber: 1,
            workouts: {
              create: [
                {
                  exerciseId: pushUps.id,
                  sets: 3,
                  reps: 10,
                  orderIndex: 1,
                },
                {
                  exerciseId: squats.id,
                  sets: 3,
                  reps: 15,
                  orderIndex: 2,
                },
              ],
            },
          },
          {
            dayNumber: 2,
            workouts: {
              create: [
                {
                  exerciseId: plank.id,
                  durationSecs: 30,
                  sets: 3,
                  orderIndex: 1,
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      days: {
        include: {
          workouts: {
            include: { exercises: true },
          },
        },
      },
    },
  })

  console.log('✅ Users:', { user1, user2 })
  console.log('✅ Program:', program)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
