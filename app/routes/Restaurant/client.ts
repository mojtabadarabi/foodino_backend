const router = require('express').Router();
import RestautantController from '@/controllers/Restautant';
import validationMiddleware from '@/middlewares/validator';
import restaurantValidator from '@/validators/restaurant';

router.get('/', RestautantController.getAll)
router.get('/:id',
    [
        restaurantValidator.getSingle
    ],
    validationMiddleware,
    RestautantController.getSingle
)

export default router
export { };
