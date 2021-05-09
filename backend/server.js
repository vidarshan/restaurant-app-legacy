import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import mealsRoutes from './routes/mealsRoutes.js';
import drinksRoutes from './routes/drinksRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use('/api/meals', mealsRoutes);
app.use('/api/drinks', drinksRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.listen(
  PORT,
  console.log(`Server running in ${MODE} on port ${PORT}`.yellow.underline.bold)
);