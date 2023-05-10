const router = require('express').Router();
const RestautantController = require('../../controllers/Restautant');
const restaurantValidator = require('../../validators/restaurant');
const validationMiddleware = require('../../middlewares/validator');

router.get('/', RestautantController.getAll)
router.get('/:id', [restaurantValidator.getSingle],
    validationMiddleware, RestautantController.getSingle)
router.post('/', [restaurantValidator.create],
    validationMiddleware, RestautantController.create)
router.put('/:id', [restaurantValidator.update],
    validationMiddleware, RestautantController.update)
router.delete('/:id', [restaurantValidator.delete],
    validationMiddleware, RestautantController.delete)

module.exports = router
export { }