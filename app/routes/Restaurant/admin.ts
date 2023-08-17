const router = require('express').Router();
import RestautantController from '@/controllers/Restautant';
import restaurantValidator from '@/validators/restaurant';
import validationMiddleware from '@/middlewares/validator';

router.post('/login', [restaurantValidator.login],
    validationMiddleware, RestautantController.login)

export default router
export { }