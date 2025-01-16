import {
    getAllPermissions,
    getPermById,
    createPerm,
    updatePerm,
    deletePerm
} from '../models/permissionModel.js';

export async function getPermissions(req, res) {
    try {
        const permissions = await getAllPermissions();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getPermission(req, res) {
    try {
        const permission = await getPermById(req.params.id);
        if (!permission) return res.status(404).send('Permission not found');
        res.json(agency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createNewPermission(req, res) {
   try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const newPerm = await createPerm(name);
        res.status(201).json(newPerm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateExistingPermission(req, res) {
    try {
        const updatedPerm = await updatePerm(req.params.id, req.body.name);
        res.json(updatedPerm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function removePermission(req, res) {
    try {
        await deletePerm(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}