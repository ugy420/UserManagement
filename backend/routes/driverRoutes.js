import express from 'express';
import {
    getDrivers,
    createNewDriver,
    updateExistingDriver,
    removeDriver
} from '../controllers/driverController.js';

const router = express.Router();

router.get("/", getDrivers);
router.post('/', createNewDriver);
router.put('/:id', updateExistingDriver);
router.delete('/:id', removeDriver);

export default router;