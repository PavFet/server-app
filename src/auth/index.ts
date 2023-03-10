import express from 'express';
import authMiddleware from 'middlewares/auth-middleware';
import { auth } from './auth';
import { login } from './login';
import { register } from './model/register';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/auth', authMiddleware, auth);

export default router;
