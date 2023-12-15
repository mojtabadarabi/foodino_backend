const router = require('express').Router();
import RestautantController from '@/controllers/Restautant';

router.get('/', RestautantController.getAll)


export default router
export { };
