import { check, header, param } from "express-validator";
import helpers from '../helpers/helpers';
const { MongoClient, ObjectID } = require('mongodb');

export default {
    create: [
        check('username').exists().trim().notEmpty().withMessage('please enter username ').bail()
            .custom(async (value, { req }) => {
                const isEmail = helpers.checkEmail(value)
                const isPhoneNumber = helpers.checkPhone(value)
                if (isEmail) {
                    req.body.email = value;
                    req.body.phone_number = null
                    return false
                }
                else if (isPhoneNumber) {
                    req.body.phone_number = value;
                    req.body.email = null
                    return false
                }
                else {
                    throw new Error('user name must be email or phone')
                }


                // const foundedRestaurant = await RestaurantModel.findOne({ name: value })
                // if (foundedRestaurant) throw new Error('name already exist !!!');
            }),
        check('password').exists().trim().notEmpty().withMessage('enter password').bail()
    ],
    get: [
        header('authorization').exists().trim().notEmpty().withMessage('enter authorization token')
    ],
    access: [
        param('id').notEmpty().withMessage('id is requires').bail().isMongoId().withMessage('id is not valid'),
        check('role').notEmpty().withMessage('enter user role').bail()
            .not().equals('SUPER_ADMIN').withMessage('cant set to super admin').bail()
            .isIn(['ADMIN', 'USER', 'RESTAURANT_ADMIN']).withMessage('enter valid role')
    ],
    searchUser: [
        check('username').exists().withMessage('enter username').bail()
            .isLength({ min: 4 }).withMessage('atleast 4 char')
    ],
    addAdmins: [
        check('ids').exists().withMessage('please enter ids ').bail()
            .isArray().withMessage('enter ids as array').bail().notEmpty().withMessage('enter at least one id !'),
        check('ids.*').custom(value => {
            if (!ObjectID.isValid(value)) {
                throw new Error('Invalid ObjectID');
            }
            return true;
        }),
    ],
}