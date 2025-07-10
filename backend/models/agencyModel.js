import pool from '../db.js';

export async function getAllAgencies() {
    const [rows] = await pool.query('SELECT * FROM agency');
    return rows;
}

export async function getAgencyById(id) {
    const [rows] = await pool.query('SELECT * FROM agency WHERE id = ?', [id]);
    return rows[0];
}

export async function createAgency(name) {
    const [result] = await pool.query('INSERT INTO agency (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
}

export async function updateAgency(id, name) {
    await pool.query('UPDATE agency SET name = ? WHERE id = ?', [name, id]);
    return { id, name };
}

export async function deleteAgency(id) {
    await pool.query('DELETE FROM agency WHERE id = ?', [id]);
}