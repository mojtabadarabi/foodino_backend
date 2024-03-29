import { seedUploads, uploadMulter } from "../helpers/multer";

const router = require('express').Router();
import restaurantRoutes from './Restaurant';
import foodRoutes from './food/index';
import userRoutes from './user';
import pagesRoute from './pages';
import actionRoute from './action';
import adminsRoute from './admins';
import helpers from '../helpers/helpers';

router.use('/restaurant', restaurantRoutes)
router.use('/food', foodRoutes)
router.use('/user', userRoutes)
router.use('/admins', adminsRoute)
router.use('/pages', pagesRoute)

router.use('/action', actionRoute)

router.use('/upload',
    uploadMulter.array('images'),
    seedUploads
)
router.use((req, res, next) => {
    helpers.sendResponse(res, null, 404, 'page not found')
});

export default router;
export { };
