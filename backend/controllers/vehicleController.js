import {
    getAllVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    createVehicleRequest,
    selVehicleRequest,
    selVehicleRequestById,
    putVehicleRequest,
    assVehicleRequest

} from '../models/vehicleModel.js';

export async function getVehicles(req, res) {
    try {
        const vehicles = await getAllVehicles();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createNewVehicle(req, res) {
    try {
        const newVehicle = await createVehicle(req.body.number);
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateExistingVehicle(req, res) {
    try {
        const vehicle = await updateVehicle(req.params.id, req.body.number);
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function removeVehicle(req,res){
    try {
        await deleteVehicle(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createNewVehicleRequest(req, res) {
    try {
        console.log(req.body);
        await createVehicleRequest(req.body);
        res.status(201).json({ message: "Vehicle request created" });

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getVehicleRequests(req, res) {
    try {
        const vehicleRequests = await selVehicleRequest();
        res.json(vehicleRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getVehicleRequestsById(req, res) {
    try {
        const vehicleRequest = await selVehicleRequestById(req.params.id);
        res.json(vehicleRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateVehicleRequest(req, res) {
    try {
        const vehicleRequest = await putVehicleRequest(req.params.id, req.body);
        res.json(vehicleRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function assignVehicleRequest(req, res) {
    try {
        console.log(req.body);
        await assVehicleRequest(req.params.id, req.body);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
