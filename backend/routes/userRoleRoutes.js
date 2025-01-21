import express from 'express';
import { getUserRolesController, updateUserRolesController } from '../controllers/userRoleController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:userId', authenticateToken, getUserRolesController);
router.put('/:userId', authenticateToken, updateUserRolesController);

export default router;