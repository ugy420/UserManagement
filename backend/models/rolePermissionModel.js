import pool from '../db.js';

export async function getRolePermissions(roleId) {
    const [rows] = await pool.query('SELECT * FROM grants WHERE roid = ?', [roleId]);
    return rows;
}

export async function updateRolePermission(roleId, permissionId, action) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        if (action === 'add') {
            await connection.query('INSERT INTO grants (roid, pid) VALUES (?, ?)', [roleId, permissionId]);
        } else if (action === 'remove') {
            await connection.query('DELETE FROM grants WHERE roid = ? AND pid = ?', [roleId, permissionId]);
        }
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}