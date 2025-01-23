import express from 'express';
import { getRolePermissionsController, updateRolePermissionsController } from '../controllers/rolePermissionController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:roleId', authenticateToken, getRolePermissionsController);
router.put('/:roleId', authenticateToken, updateRolePermissionsController);

export default router;