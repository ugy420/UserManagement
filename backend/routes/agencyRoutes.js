import express from 'express';
import {
    getAgencies,
    getAgency,
    createNewAgency,
    updateExistingAgency,
    removeAgency
} from '../controllers/agencyController.js';

const router = express.Router();

router.get('/agencies', getAgencies);
router.get('/agencies/:id', getAgency);
router.post('/agencies', createNewAgency);
router.put('/agencies/:id', updateExistingAgency);
router.delete('/agencies/:id', removeAgency);

export default router;