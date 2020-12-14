import { Router } from 'express';
const router = Router();
import { io } from '../../index'

import { authenticateToken } from 'helpers/authenticate';

//routes:
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
const chatRoutes = require('./chatRoutes');

router.use('/auth', authRoutes)
router.use("/chatroom", /*authenticateToken, */ chatRoutes(io));
router.use('/users', /*authenticateToken, */ userRoutes);

export default router;
