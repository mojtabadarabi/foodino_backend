
const router = require('express').Router();
import pagesControllers from '@/controllers/pages';
import authMiddleware from '../../middlewares/auth';
const { foodManagement } = require('../../../config/permissions')

router.get('/main-page', pagesControllers.mainPage)
router.get('/admin-page',
    [
        authMiddleware.checkRefreshToken,
        (req, res, next) => authMiddleware.checkUserPermissions(req, res, next, [foodManagement]),
    ]
    ,
    pagesControllers.adminPage)

export default router
export { };

