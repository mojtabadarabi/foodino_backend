const router = require('express').Router();
const UserController = require('../controllers/user');
const userValidation = require('../validators/user');
const validationMiddleware = require('../middlewares/validator');

router.post('/sign', [userValidation.create],
validationMiddleware,  UserController.sign.bind(UserController))

module.exports = router
export { }