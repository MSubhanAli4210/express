import express from 'express';
import { authRouter } from './auth/routers/authRouter.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

const PORT = 3000

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT,  ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})
app.use(express.json());

app.use('/auth', authRouter);