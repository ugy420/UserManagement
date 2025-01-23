import { getRolePermissions, updateRolePermission } from '../models/rolePermissionModel.js';

export async function getRolePermissionsController(req, res) {
    try {
        const rolePermissions = await getRolePermissions(req.params.roleId);
        res.json(rolePermissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateRolePermissionsController(req, res) {
    try {
        const { permission } = req.body;
        const roleId = req.params.roleId;
        
        for (const permId in permission) {
            const action = permission[permId] ? 'add' : 'remove';
            await updateRolePermission(roleId, permId, action);
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}