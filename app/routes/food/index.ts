
const router = require('express').Router();
import clientFoodRoutes from './client';
import adminFoodRoutes from './admin';

router.use('/client', clientFoodRoutes)
router.use('/admin', adminFoodRoutes)

export default router
export { };
