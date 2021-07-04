import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import User from './models/UserModel.js';

import mealsRoutes from './routes/mealsRoutes.js';
import drinksRoutes from './routes/drinksRoutes.js';
import categoriesRoutes from './routes/categoriesRoute.js';
import userRoutes from './routes/userRoutes.js';
import index from './routes/index.js';

dotenv.config();

connectDB();

const app = express();

app.use(morgan('tiny'));

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.json());

function watching() {
  User.watch().on('change', (change) => {
    console.log('Changes Detected'.blue);
    io.to(change._id).emit('changes', change.fullDocument);
  });
}

io.on('connection', (socket) => {
  console.log('Client Connected'.magenta);
  socket.on('joinRoom', (data) => {
    socket.join(data.myID);
  });
});

watching();

app.use((req, res, next) => {
  next();
});

app.use('/', index);
app.use('/api/meals', mealsRoutes);
app.use('/api/drinks', drinksRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.set('port', PORT || 5000);

httpServer.listen(app.get('port'), function () {
  console.log(
    `Server running on port ${PORT} in ${MODE} mode`.yellow.underline
  );
});
