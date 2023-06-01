const router = require('express').Router();
const foodController = require('../../controllers/food/client');
const foodValidator = require('../../validators/food');
const validationMiddleware = require('../../middlewares/validator');

router.get('/', foodController.getAll)

router.post('/:id', [foodValidator.clientGetSingle],
    validationMiddleware, foodController.getSingle)


module.exports = router
export { };
