import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import { createServer } from 'http';
import { Server } from 'socket.io';

import { authRouter } from './auth/routers/authRouter.js';
import { productRouter } from './e_commerce/routers/productRouter.js';
import { cartRouter } from './e_commerce/routers/cartRouter.js';
import { orderRouter } from './e_commerce/routers/orderRouter.js';

const app = express();

dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');}).catch((err) => {
  console.log('Error connecting to MongoDB', err);
});

app.use(cors({origin: "http://localhost:5173", credentials: true,}));
app.use(express.json());

// Wrap Express in a raw HTTP server so Socket.IO can attach to it
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

// Each user joins a private "room" named after their own userId.
// This means order updates only reach the user who owns that order.
io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`Socket ${socket.id} joined room ${userId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

// Make io accessible inside controllers via req.app.get('io')
app.set('io', io);

app.get('/', (req, res) => {res.send('Hello World');});
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);

const PORT = 3000
httpServer.listen(PORT,  ()=>{console.log(`server is running on http://localhost:${PORT}`);})