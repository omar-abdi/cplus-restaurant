import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';

import drinksRoutes from './routes/drinks.js';
import foodRoutes from './routes/food.js';
import orderRoutes from './routes/order.js';
import contactRoutes from './routes/contact.js';
import cors from 'cors';
import dns from 'dns';

// DNS Fix MongoDB Atlas SRV Error
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use('/api/user', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/drinks', drinksRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/contact', contactRoutes);

connectDB();

export default app;