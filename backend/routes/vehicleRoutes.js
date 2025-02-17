import express from 'express';
import {
    getVehicles,
    createNewVehicle,
    updateExistingVehicle,
    removeVehicle,
    createNewVehicleRequest,
    getVehicleRequests,
    updateVehicleRequest,
    assignVehicleRequest,
    getVehicleRequestsById
} from '../controllers/vehicleController.js'

const router = express.Router();

router.get("/", getVehicles);
router.post('/', createNewVehicle);
router.put('/:id', updateExistingVehicle);
router.delete('/:id', removeVehicle);

router.post('/request', createNewVehicleRequest);
router.get('/request', getVehicleRequests);
router.get('/request/:id', getVehicleRequestsById);
router.put('/request/:id', updateVehicleRequest);
router.put('/assign/:id', assignVehicleRequest);

export default router;