const router = require('express').Router();
import adminsController from '../controllers/admins';
import authMiddleware from '../middlewares/auth';
import validationMiddleware from '../middlewares/validator';
import adminsValidation from '../validators/admins';

const { accessManagement } = require('../../config/permissions')

router.post('/', [
    adminsValidation.addAdmins,
    authMiddleware.checkRefreshToken,
],
    validationMiddleware
    , adminsController.addAdmins.bind(adminsController)
)

router.delete('/', [
    adminsValidation.addAdmins,
    authMiddleware.checkRefreshToken,
],
    validationMiddleware
    , adminsController.removeAdmins.bind(adminsController)
)

export default router
export { };

