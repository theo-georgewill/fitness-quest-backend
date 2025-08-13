import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import programRoutes from './routes/programRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/programs', programRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
