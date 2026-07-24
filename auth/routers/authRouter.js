import express from 'express';
import { loginController } from '../controllers/loginController.js';
import { signupController } from '../controllers/signupController.js';
import { loginCredentialsCheck, signupCredentialsCheck } from '../middleware/credentialsCheck.js';

export const authRouter = express.Router();

authRouter.post('/login', loginCredentialsCheck, loginController);
authRouter.post('/register', signupCredentialsCheck, signupController);