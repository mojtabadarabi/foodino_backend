const router = require('express').Router();
const restaurantRoutes = require('./Restaurant/client');
const adminRestaurantRoutes = require('./adminRoutes');
const foodRoutes = require('./food');
const helpers = require('../helpers/helpers');

router.use('/restaurant', restaurantRoutes)
router.use('/restaurant', adminRestaurantRoutes)
router.use('/food', foodRoutes)
router.use((req, res, next) => {
    helpers.sendResponse(res, null, 404, 'page not found')
});

module.exports = router
export { }