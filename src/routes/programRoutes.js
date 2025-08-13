import express from 'express';
import { createProgram, getPrograms } from '../controllers/programController.js';

const router = express.Router();

router.post('/', createProgram);
router.get('/', getPrograms);

export default router;
