import pool from '../db.js';

export async function getAllRoles() {
    const [rows] = await pool.query('SELECT * FROM role');
    return rows;
}

export async function getRoleById(id) {
    const [rows] = await pool.query('SELECT * FROM Role WHERE id = ?', [id]);
    return rows[0];
}

export async function createRole(name) {
    const [result] = await pool.query('INSERT INTO Role (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
}

export async function updateRole(id, name) {
    await pool.query('UPDATE Role SET name = ? WHERE id = ?', [name, id]);
    return { id, name };
}

export async function deleteRole(id) {
    await pool.query('DELETE FROM Role WHERE id = ?', [id]);
}