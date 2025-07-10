import pool from '../db.js';

export async function getAllPermissions() {
    const [rows] = await pool.query('SELECT * FROM permission');
    return rows;
}

export async function getPermById(id) {
    const [rows] = await pool.query('SELECT * FROM permission WHERE id = ?', [id]);
    return rows[0];
}

export async function createPerm(name) {
    const [result] = await pool.query('INSERT INTO permission (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
}

export async function updatePerm(id, name) {
    await pool.query('UPDATE permission SET name = ? WHERE id = ?', [name, id]);
    return { id, name };
}

export async function deletePerm(id) {
    await pool.query('DELETE FROM permission WHERE id = ?', [id]);
}