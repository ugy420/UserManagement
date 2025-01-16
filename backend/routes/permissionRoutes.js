import express from 'express';
import {
    getPermissions,
    getPermission,
    createNewPermission,
    updateExistingPermission,
    removePermission
} from '../controllers/permissionController.js';

const router = express.Router();

router.get('/', getPermissions);
router.get('/:id', getPermission);
router.post('/', createNewPermission);
router.put('/:id', updateExistingPermission);
router.delete('/:id', removePermission);

export default router;