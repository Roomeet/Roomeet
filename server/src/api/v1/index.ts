import { Router } from 'express';
const router = Router();

import { authenticateToken } from 'helpers/authenticate';

//routes:
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import mockdataRoutes from './mockdataRoutes';

router.use('/auth', authRoutes);
router.use('/users', /*authenticateToken, */ userRoutes);
router.use('/mock', mockdataRoutes);

export default router;
