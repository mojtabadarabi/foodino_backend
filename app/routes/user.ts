const router = require('express').Router();
import UserController from '../controllers/user';
import authMiddleware from '../middlewares/auth';
import validationMiddleware from '../middlewares/validator';
import userValidation from '../validators/user';

const { accessManagement } = require('../../config/permissions')

router.get('/', [authMiddleware.checkRefreshToken],
    validationMiddleware, UserController.getUser.bind(UserController))

router.post('/sign', [userValidation.create],
    validationMiddleware, UserController.sign.bind(UserController))

router.get('/logout', [authMiddleware.checkRefreshToken],
    validationMiddleware, UserController.logout.bind(UserController))

router.put('/change-role/:id', [
    userValidation.access,
    authMiddleware.checkRefreshToken,
    (req, res, next) => authMiddleware.checkUserPermissions(req, res, next, [accessManagement])
],
    validationMiddleware
    , UserController.changeUserRole.bind(UserController)
)

router.get('/users', [
    authMiddleware.checkRefreshToken,
    (req, res, next) => authMiddleware.checkUserPermissions(req, res, next, [accessManagement])
],
    validationMiddleware
    , UserController.getUsers.bind(UserController)
)

router.post('/search-users', [
    userValidation.searchUser,
    authMiddleware.checkRefreshToken,
],
    validationMiddleware
    , UserController.searchUser.bind(UserController)
)

router.post('/add-admins', [
    userValidation.addAdmins,
    authMiddleware.checkRefreshToken,
],
    validationMiddleware
    , UserController.addAdmins.bind(UserController)
)

export default router
export { };

