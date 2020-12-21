import { Router } from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const router = Router();
// import { io } from '../../index'

// import { authenticateToken } from 'helpers/authenticate';

// routes:

// const chatRoutes = require('./chatRoutes');

router.use('/auth', authRoutes);
// router.use("/chatroom", /*authenticateToken, */ chatRoutes(io));
router.use('/users', userRoutes);

export default router;
