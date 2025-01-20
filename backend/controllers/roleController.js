import {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
} from '../models/roleModel.js';

export async function getRoles(req, res) {
    try {
        const roles = await getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getRole(req, res) {
    try {
        const role = await getRoleById(req.params.id);
        if (!role) return res.status(404).send('Role not found');
        res.json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createNewRole(req, res) {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const newRole = await createRole(name);
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateExistingRole(req, res) {
    try {
        const updatedRole = await updateRole(req.params.id, req.body.name);
        res.json(updatedRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function removeRole(req, res) {
    try {
        await deleteRole(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}