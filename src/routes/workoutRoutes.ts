import { Router } from 'express';
import { createWorkout, getTodayWorkout, getWorkoutsByDay } from '../controllers/workoutController.js';

const router = Router();

router.post('/', createWorkout);                      // Create a workout (exercise + reps + sets)
router.get('/today', getTodayWorkout);                 // Get today's workout
router.get('/:programDayId', getWorkoutsByDay);  

export default router;
