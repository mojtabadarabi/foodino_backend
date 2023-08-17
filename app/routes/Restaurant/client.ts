const router = require('express').Router();
import RestautantController from '@/controllers/Restautant';
import restaurantValidator from '@/validators/restaurant';
import validationMiddleware from '@/middlewares/validator';

router.get('/', RestautantController.getAll)
router.get('/:id', [restaurantValidator.getSingle],
    validationMiddleware, RestautantController.getSingle)
router.post('/', [restaurantValidator.create],
    validationMiddleware, RestautantController.create)
router.put('/:id', [restaurantValidator.update],
    validationMiddleware, RestautantController.update)
router.delete('/:id', [restaurantValidator.delete],
    validationMiddleware, RestautantController.delete)

export default router
export { }