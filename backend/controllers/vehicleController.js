import {
    getAllVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle
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