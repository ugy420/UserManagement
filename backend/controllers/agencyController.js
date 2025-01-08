import {
    getAllAgencies,
    getAgencyById,
    createAgency,
    updateAgency,
    deleteAgency
} from '../models/agencyModel.js';

export async function getAgencies(req, res) {
    try {
        const agencies = await getAllAgencies();
        res.json(agencies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getAgency(req, res) {
    try {
        const agency = await getAgencyById(req.params.id);
        if (!agency) return res.status(404).send('Agency not found');
        res.json(agency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createNewAgency(req, res) {
    try {
        const newAgency = await createAgency(req.body.name);
        res.status(201).json(newAgency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateExistingAgency(req, res) {
    try {
        const updatedAgency = await updateAgency(req.params.id, req.body.name);
        res.json(updatedAgency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function removeAgency(req, res) {
    try {
        await deleteAgency(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}