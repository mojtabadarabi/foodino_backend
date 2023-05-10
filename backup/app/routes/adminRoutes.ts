const router = require('express').Router();
const RestautantController = require('../controllers/Restautant');
const restaurantValidator = require('../validators/restaurant');
const validationMiddleware = require('../middlewares/validator');

router.post('/login', [restaurantValidator.login],
    validationMiddleware, RestautantController.login)

module.exports = router
export { }