// src/middleware/authMiddleware.ts
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

interface JwtPayload {
  id: number;
  email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token; // read from cookie
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, token missing' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded; // attach user info to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
