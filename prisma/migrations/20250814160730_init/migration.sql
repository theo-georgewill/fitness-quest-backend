-- CreateEnum
CREATE TYPE "public"."EnrollmentStatus" AS ENUM ('ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Program" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" TEXT,
    "durationWeeks" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProgramDay" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "equipment" TEXT,
    "targetMuscles" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Workout" (
    "id" SERIAL NOT NULL,
    "programDayId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "sets" INTEGER,
    "reps" INTEGER,
    "durationSecs" INTEGER,
    "restSecs" INTEGER,
    "tempo" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Enrollment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "status" "public"."EnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentDay" INTEGER NOT NULL DEFAULT 1,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserWorkout" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "programDayId" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durationSecs" INTEGER,
    "calories" INTEGER,
    "notes" TEXT,

    CONSTRAINT "UserWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserExerciseLog" (
    "id" SERIAL NOT NULL,
    "userWorkoutId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "setsCompleted" INTEGER,
    "repsPerSet" INTEGER,
    "durationSecs" INTEGER,
    "weightKg" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserExerciseLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramDay_programId_dayNumber_key" ON "public"."ProgramDay"("programId", "dayNumber");

-- CreateIndex
CREATE INDEX "Workout_exerciseId_idx" ON "public"."Workout"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_programDayId_orderIndex_key" ON "public"."Workout"("programDayId", "orderIndex");

-- CreateIndex
CREATE INDEX "Enrollment_userId_programId_idx" ON "public"."Enrollment"("userId", "programId");

-- CreateIndex
CREATE INDEX "UserWorkout_userId_idx" ON "public"."UserWorkout"("userId");

-- CreateIndex
CREATE INDEX "UserWorkout_enrollmentId_programDayId_idx" ON "public"."UserWorkout"("enrollmentId", "programDayId");

-- CreateIndex
CREATE INDEX "UserExerciseLog_userWorkoutId_idx" ON "public"."UserExerciseLog"("userWorkoutId");

-- CreateIndex
CREATE INDEX "UserExerciseLog_exerciseId_idx" ON "public"."UserExerciseLog"("exerciseId");

-- AddForeignKey
ALTER TABLE "public"."ProgramDay" ADD CONSTRAINT "ProgramDay_programId_fkey" FOREIGN KEY ("programId") REFERENCES "public"."Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Workout" ADD CONSTRAINT "Workout_programDayId_fkey" FOREIGN KEY ("programDayId") REFERENCES "public"."ProgramDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Workout" ADD CONSTRAINT "Workout_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "public"."Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Enrollment" ADD CONSTRAINT "Enrollment_programId_fkey" FOREIGN KEY ("programId") REFERENCES "public"."Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserWorkout" ADD CONSTRAINT "UserWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserWorkout" ADD CONSTRAINT "UserWorkout_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "public"."Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserWorkout" ADD CONSTRAINT "UserWorkout_programDayId_fkey" FOREIGN KEY ("programDayId") REFERENCES "public"."ProgramDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserExerciseLog" ADD CONSTRAINT "UserExerciseLog_userWorkoutId_fkey" FOREIGN KEY ("userWorkoutId") REFERENCES "public"."UserWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserExerciseLog" ADD CONSTRAINT "UserExerciseLog_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "public"."Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
