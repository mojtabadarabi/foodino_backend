const router = require('express').Router();
import RestautantController from '@/controllers/Restautant';
import validationMiddleware from '@/middlewares/validator';
import restaurantValidator from '@/validators/restaurant';
import authMiddleware from '../../middlewares/auth';

const { restaurantManagement } = require('../../../config/permissions')

router.post('/login', [restaurantValidator.login],
    validationMiddleware, RestautantController.login)

router.get('/:id',
    [
        restaurantValidator.getSingle
    ],
    validationMiddleware,
    RestautantController.getSingle
)

router.post('/',
    [
        authMiddleware.checkRefreshToken,
        restaurantValidator.create
    ],
    validationMiddleware
    , RestautantController.create
)

router.put('/approval',
    [
        authMiddleware.checkRefreshToken, (req, res, next) => authMiddleware.
            checkUserPermissions(req, res, next, [restaurantManagement]),
        restaurantValidator.approval
    ],
    validationMiddleware,
    RestautantController.approval
)

router.put('/:id',
    [
        authMiddleware.checkRefreshToken, (req, res, next) => authMiddleware.
            checkUserPermissions(req, res, next, [restaurantManagement]),
        restaurantValidator.update
    ],
    validationMiddleware,
    RestautantController.update
)



router.delete('/:id',
    [
        authMiddleware.checkRefreshToken, (req, res, next) => authMiddleware.
            checkUserPermissions(req, res, next, [restaurantManagement]),
        restaurantValidator.delete
    ],
    validationMiddleware,
    RestautantController.delete
)


export default router
export { };

