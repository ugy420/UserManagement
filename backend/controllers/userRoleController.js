import { getUserRoles, updateUserRole } from '../models/userRoleModel.js';

export async function getUserRolesController(req, res) {
    try {
        const userRoles = await getUserRoles(req.params.userId);
        res.json(userRoles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateUserRolesController(req, res) {
    try {
        const { role } = req.body;
        const userId = req.params.userId;

        for (const roleId in role) {
            const action = role[roleId] ? 'add' : 'remove';
            await updateUserRole(userId, roleId, action);
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}