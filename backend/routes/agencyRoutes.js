import express from 'express';
import {
    getAgencies,
    getAgency,
    createNewAgency,
    updateExistingAgency,
    removeAgency
} from '../controllers/agencyController.js';

const router = express.Router();

router.get('/', getAgencies);
router.get('/:id', getAgency);
router.post('/', createNewAgency);
router.put('/:id', updateExistingAgency);
router.delete('/:id', removeAgency);

export default router;