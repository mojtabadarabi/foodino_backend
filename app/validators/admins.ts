import { check } from "express-validator";
const { MongoClient, ObjectID } = require('mongodb');

export default {
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