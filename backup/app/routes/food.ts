import { uploadMulter } from "../helpers/multer";

const router = require('express').Router();
const foodController = require('../controllers/food');
const foodValidator = require('../validators/food');
const validationMiddleware = require('../middlewares/validator');
const authMiddleware = require('../middlewares/auth');

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

module.exports = router
export { }