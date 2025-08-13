import express from 'express';
import {
  createProgramDay,
  getProgramDays,
  createExercise,
  logWorkout,
} from '../controllers/workoutController.js';

const router = express.Router();

// Program Days
router.post('/days', createProgramDay);
router.get('/days/:programId', getProgramDays);

// Exercises
router.post('/exercises', createExercise);

// Workout Logs
router.post('/log', logWorkout);

export default router;
