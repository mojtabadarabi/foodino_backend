import { approvalController } from "@/controllers/actions";
import validationMiddleware from '@/middlewares/validator';
import actionsValidator from '@/validators/actions';

const router = require('express').Router();

import authMiddleware from '../../middlewares/auth';

const { restaurantManagement } = require('../../../config/permissions')

router.put('/approval', [
  actionsValidator.approval,
  authMiddleware.checkRefreshToken, 
  (req, res, next) => authMiddleware.checkUserPermissions(req, res, next, [authMiddleware.getPermissionbyApprovalType(req.body.type)]),
],
  validationMiddleware, approvalController);

export default router;
export { };

