const router = require('express').Router();
import foodController from '../../controllers/food/client';
import foodValidator from '../../validators/food';
import validationMiddleware from '../../middlewares/validator';

router.get('/', foodController.getAll)

router.post('/:id', [foodValidator.clientGetSingle],
    validationMiddleware, foodController.getSingle)


export default router
export { };
