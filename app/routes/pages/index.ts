
const router = require('express').Router();
import pagesControllers from '@/controllers/pages';

router.get('/main-page', pagesControllers.mainPage)

export default router
export { };
