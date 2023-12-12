import { check } from "express-validator";
import helpers from '../helpers/helpers';

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
}