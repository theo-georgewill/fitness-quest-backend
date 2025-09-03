// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import prisma from './prismaClient.ts';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.get('/', async (req, res) => {
  res.json({ message: 'Fitness Quest API is running' });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// Optional: handle Prisma disconnect on exit
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});


process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});