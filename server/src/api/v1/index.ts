import { Router } from 'express';

import { authenticateToken } from 'helpers/authenticate';

// routes:
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', /* authenticateToken, */ userRoutes);

export default router;
