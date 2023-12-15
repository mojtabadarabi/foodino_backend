import { check } from "express-validator";
const { MongoClient, ObjectID } = require('mongodb');

export default {
    approval: [
        check('ids').exists().withMessage('please enter ids ').bail()
            .isArray().withMessage('enter ids as array'),
        check('ids.*').custom(value => {
            if (!ObjectID.isValid(value)) {
                throw new Error('Invalid ObjectID');
            }
            return true;
        }),

        check('type').exists().withMessage('enter type'),

        check('isApproval').exists().withMessage('enter isApproval').bail()
            .isBoolean().withMessage('enter isApproval boolean').bail()
    ],
}