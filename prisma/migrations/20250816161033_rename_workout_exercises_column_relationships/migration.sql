/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `orderIndex` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `restSecs` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `tempo` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Workout" DROP CONSTRAINT "Workout_exerciseId_fkey";

-- DropIndex
DROP INDEX "public"."Workout_exerciseId_idx";

-- DropIndex
DROP INDEX "public"."Workout_programDayId_orderIndex_key";

-- AlterTable
ALTER TABLE "public"."Workout" DROP COLUMN "exerciseId",
DROP COLUMN "orderIndex",
DROP COLUMN "restSecs",
DROP COLUMN "tempo";

-- CreateTable
CREATE TABLE "public"."WorkoutExercise" (
    "id" SERIAL NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "duration" INTEGER,
    "restSecs" INTEGER,
    "tempo" TEXT,
    "orderIndex" INTEGER NOT NULL,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Workout_programDayId_idx" ON "public"."Workout"("programDayId");

-- AddForeignKey
ALTER TABLE "public"."WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "public"."Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "public"."Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
