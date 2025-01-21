import pool from '../db.js';

export async function getUserRoles(userId) {
    const [rows] = await pool.query('SELECT * FROM has WHERE uid = ?', [userId]);
    return rows;
}

export async function updateUserRole(userId, roleId, action) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        if (action === 'add') {
            await connection.query('INSERT INTO has (uid, rid) VALUES (?, ?)', [userId, roleId]);
        } else if (action === 'remove') {
            await connection.query('DELETE FROM has WHERE uid = ? AND rid = ?', [userId, roleId]);
        }
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}