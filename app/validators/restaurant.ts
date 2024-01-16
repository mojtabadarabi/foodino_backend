import { check, param } from "express-validator";
import RestaurantModel from '../models/Restaurant'
const { MongoClient, ObjectID } = require('mongodb');

export default {
    getSingle: [
        param('id').notEmpty().withMessage('id is requires').bail().isMongoId().withMessage('id is not valid')
    ],
    create: [
        check('name').exists().withMessage('please enter name ').bail()
            .isLength({ min: 3 }).withMessage('please enter name at least 3 char ').bail()
            .custom(async (value, { req }) => {
                const foundedRestaurant = await RestaurantModel?.findOne({ name: value })
                if (foundedRestaurant) throw new Error('name already exist !!!');
                return true
            }),
        check('description').exists().withMessage('enter description').bail()
            .isLength({ min: 3 }).withMessage('please enter description at least 3 char ').bail()
        ,
        check('address').exists().withMessage('enter address').bail()
            .isLength({ min: 3 }).withMessage('please enter address at least 3 char ').bail()
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
    approval: [
        check('ids').exists().withMessage('please enter ids ').bail()
            .isArray().withMessage('enter ids as array').bail().notEmpty().withMessage('enter at least one id !'),
        check('ids.*').custom(value => {
            if (!ObjectID.isValid(value)) {
                throw new Error('Invalid ObjectID');
            }
            return true;
        }),
        check('isApproval').exists().withMessage('enter isApproval').bail()
            .isBoolean().withMessage('enter isApproval boolean').bail()
    ],
}