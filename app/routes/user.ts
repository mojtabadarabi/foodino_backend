const router = require('express').Router();
import UserController from '../controllers/user';
import userValidation from '../validators/user';
import validationMiddleware from '../middlewares/validator';

router.post('/sign', [userValidation.create],
validationMiddleware,  UserController.sign.bind(UserController))

export default router
export { }