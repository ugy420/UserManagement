import express from 'express';
import {
    getVehicles,
    createNewVehicle,
    updateExistingVehicle,
    removeVehicle,
    createNewVehicleRequest
} from '../controllers/vehicleController.js'

const router = express.Router();

router.get("/", getVehicles);
router.post('/', createNewVehicle);
router.put('/:id', updateExistingVehicle);
router.delete('/:id', removeVehicle);
router.post('/request', createNewVehicleRequest);

export default router;