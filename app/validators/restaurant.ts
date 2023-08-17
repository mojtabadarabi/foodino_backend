import { check, param } from "express-validator";
const RestaurantModel = require('../models/Restaurant');

export default {
    getSingle: [
        param('id').notEmpty().withMessage('id is requires').bail().isMongoId().withMessage('id is not valid')
    ],
    create: [
        check('name').exists().withMessage('please enter name ').bail()
            .isLength({ min: 3 }).withMessage('please enter name at least 3 char ').bail()
            .custom(async (value, { req }) => {
                const foundedRestaurant = await RestaurantModel.findOne({ name: value })
                if (foundedRestaurant) throw new Error('name already exist !!!');
                return true
            }),
        check('description').exists().withMessage('enter description').bail()
            .isLength({ min: 3 }).withMessage('please enter description at least 3 char ').bail()
        ,
        check('address').exists().withMessage('enter address').bail()
            .isLength({ min: 3 }).withMessage('please enter address at least 3 char ').bail()
        ,
        check('adminUserName').exists().withMessage('enter user name').bail()
            .isLength({ min: 3 }).withMessage('please enter username at least 3 char ').bail()
            .custom(async (value, { req }) => {
                const foundedRestaurant = await RestaurantModel.findOne({ adminUserName: value })
                if (foundedRestaurant) throw new Error('this userName is not available !!!');
                return true
            })
        ,
        check('adminPassword').exists().withMessage('enter password').bail()
            .isLength({ min: 3 }).withMessage('please enter password at least 3 char ').bail()
        ,
    ],
    update: [
        param('id').exists().withMessage('please enter id ').bail()
            .custom(async (value, { req }) => {
                const foundedRestaurant = await RestaurantModel.findById(value)
                if (!foundedRestaurant) throw new Error('restaurant not found');
                return true
            }),
    ],
    delete: [
        param('id').exists().withMessage('please enter id ').bail()
            .custom(async (value, { req }) => {
                const foundedRestaurant = await RestaurantModel.findById(value)
                if (!foundedRestaurant) throw new Error('restaurant not found');
                return true
            }),
    ],
    login: [
        check('userName').exists().withMessage('please enter userName ').bail()
            .isLength({ min: 3 }).withMessage('please enter userName at least 3 char ').bail(),
        check('password').exists().withMessage('enter password').bail()
            .isLength({ min: 3 }).withMessage('please enter password at least 3 char ').bail()
        ,
    ],
}