import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import  prismaClient from '../prismaClient.ts';
import { register, login } from '../controllers/authController.ts';

dotenv.config();
const router = express.Router();
const prisma = prismaClient;

router.post('/register', register);

router.post('/login', login);

export default router;
