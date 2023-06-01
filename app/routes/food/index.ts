
const router = require('express').Router();
const clientFoodRoutes = require('./client');
const adminFoodRoutes = require('./admin');

router.use('/client', clientFoodRoutes)
router.use('/admin', adminFoodRoutes)

module.exports = router
export { };
