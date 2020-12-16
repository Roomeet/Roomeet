import { Router } from 'express';

const router = Router();

router.use('/messenger', require('./messengerRoutes'))
router.use('/matches', require('./matchRoutes'))

export default router;
