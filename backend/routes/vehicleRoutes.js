import express from 'express';
import {
    getVehicles,
    createNewVehicle,
    updateExistingVehicle,
    removeVehicle
} from '../controllers/vehicleController.js'

const router = express.Router();

router.get("/", getVehicles);
router.post('/', createNewVehicle);
router.put('/:id', updateExistingVehicle);
router.delete('/:id', removeVehicle);

export default router;