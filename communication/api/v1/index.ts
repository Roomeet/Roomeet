import { Router } from 'express';

const router = Router();

router.use('/messenger', require('./messengerRoutes'))
router.use('/matches', require('./matchRoutes'))
router.use('/likes', require('./likeRoutes'))
router.use('/notifications', require('./notificationRoutes'))

export default router;
