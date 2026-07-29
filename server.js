import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";

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

app.get('/', (req, res) => {res.send('Hello World');});
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);

const PORT = 3000
app.listen(PORT,  ()=>{console.log(`server is running on http://localhost:${PORT}`);})