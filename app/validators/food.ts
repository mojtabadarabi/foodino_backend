import { check, param } from "express-validator";

export default {
    getSingle: [
        param('id').notEmpty().withMessage('id is requires').bail().isMongoId().withMessage('id is not valid')
    ],
    create: [
        check('name').exists().withMessage('please enter name ').bail()
            .isLength({ min: 3 }).withMessage('please enter name at least 3 char '),
        check('description').exists().withMessage('enter description').bail()
            .isLength({ min: 3 }).withMessage('please enter description at least 3 char ').bail()
        ,
        check('price').exists().withMessage('enter price').bail()
            .isNumeric().withMessage('enter price number').bail()
    ],
    delete: [
        param('id').exists().withMessage('please enter id ').bail()
    ],
    update: [
        param('id').exists().withMessage('please enter id ').bail()
    ],
    clientGetSingle: [
        param('id').notEmpty().withMessage('id is requires').bail().isMongoId().withMessage('id is not valid'),
        // check('foodId').notEmpty().withMessage('food id is requires').bail().isMongoId().withMessage('food id is not valid'),
    ],
}