import express from 'express';
import {
    getRoles,
    getRole,
    createNewRole,
    updateExistingRole,
    removeRole
} from '../controllers/roleController.js';

const router = express.Router();

router.get('/', getRoles);
router.get('/:id', getRole);
router.post('/', createNewRole);
router.put('/:id', updateExistingRole);
router.delete('/:id', removeRole);

export default router;