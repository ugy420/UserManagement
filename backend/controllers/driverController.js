import {
    getAllDrivers,
    createDriver,
    updateDriver,
    deleteDriver
} from '../models/driverModel.js';

export async function getDrivers(req, res) {
    try {
        const drivers = await getAllDrivers();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createNewDriver(req, res) {
    try {
        const { name, phone } = req.body;
        const newDriver = await createDriver(name, phone);
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateExistingDriver(req, res) {
    try {
        const { name, phone } = req.body;
        const updatedDriver = await updateDriver(req.params.id, name, phone);
        res.json(updatedDriver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function removeDriver(req, res) {
    try {
        await deleteDriver(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}