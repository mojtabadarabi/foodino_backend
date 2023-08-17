import { uploadMulter } from "../../helpers/multer";

const router = require('express').Router();
import foodController from '../../controllers/food/admin';
import foodValidator from '../../validators/food';
import validationMiddleware from '../../middlewares/validator';
import authMiddleware from '../../middlewares/auth';

router.get('/',
    [authMiddleware.checkRefreshToken, authMiddleware.checkRestaurantAdmin],
    foodController.getAll)


router.get('/:id',
    [authMiddleware.checkRefreshToken, authMiddleware.checkRestaurantAdmin, foodValidator.getSingle],
    foodController.getSingle)

router.post('/',
    uploadMulter.array('images'),
    [authMiddleware.checkRefreshToken, authMiddleware.checkRestaurantAdmin, foodValidator.create],
    validationMiddleware,
    foodController.create
)

router.delete('/:id',
    [foodValidator.delete, authMiddleware.checkRefreshToken, authMiddleware.checkRestaurantAdmin],
    validationMiddleware,
    foodController.delete
)
router.put('/:id',
    [foodValidator.update, authMiddleware.checkRefreshToken, authMiddleware.checkRestaurantAdmin],
    validationMiddleware,
    foodController.update
)

export default router
export { }