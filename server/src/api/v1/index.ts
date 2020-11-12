import { Router } from 'express';
const router = Router();

import { authenticateToken } from 'helpers/authenticate';

//routes:
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

router.use('/auth', authRoutes)
router.use('/users', /*authenticateToken, */ userRoutes);

export default router;
