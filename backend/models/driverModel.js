import pool from '../db.js';

export async function getAllDrivers() {
    const [rows] = await pool.query('SELECT * FROM driver');
    return rows;
}

export async function createDriver(name, phone) {
    const [result] = await pool.query('INSERT INTO driver (name, phone) VALUES (?, ?)', [name, phone]);
    return { id: result.insertId, name, phone };
}

export async function updateDriver(id, name, phone) {
    await pool.query('UPDATE driver SET name = ?, phone = ? WHERE id = ?', [name, phone, id]);
    return { id, name, phone };
}

export async function deleteDriver(id) {
    await pool.query('DELETE FROM driver WHERE id = ?', [id]);
}