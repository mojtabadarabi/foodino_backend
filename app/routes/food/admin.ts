import foodController from '../../controllers/food/admin';
import { uploadMulter } from "../../helpers/multer";
import authMiddleware from '../../middlewares/auth';
import validationMiddleware from '../../middlewares/validator';
import foodValidator from '../../validators/food';

const router = require('express').Router();
const { createFood, editFood, deleteFood } = require('../../../config/permissions')

router.get('/',
    [authMiddleware.checkRefreshToken, authMiddleware.checkRestaurantAdmin],
    foodController.getAll)


// router.get('/:id',
//     [authMiddleware.checkRefreshToken, authMiddleware.checkRestaurantAdmin, foodValidator.getSingle],
//     foodController.getSingle)

router.post('/',
    uploadMulter.array('images'),
    [authMiddleware.checkRefreshToken, (req, res, next) => authMiddleware.checkUserPermissions(req, res, next, [createFood]), foodValidator.create],
    validationMiddleware,
    foodController.create
)

router.delete('/:id',
    [foodValidator.delete, authMiddleware.checkRefreshToken, (req, res, next) => authMiddleware.checkUserPermissions(req, res, next, [deleteFood])],
    validationMiddleware,
    foodController.delete
)
router.put('/:id',
    [foodValidator.update, authMiddleware.checkRefreshToken, (req, res, next) => authMiddleware.checkUserPermissions(req, res, next, [editFood])],
    validationMiddleware,
    foodController.update
)

export default router
export { };

