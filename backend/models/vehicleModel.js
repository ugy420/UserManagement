import pool from '../db.js';

export async function getAllVehicles() {
    const [rows] = await pool.query('SELECT * FROM Vehicle');
    return rows;
}

export async function createVehicle(num) {
    const [res] = await pool.query('INSERT INTO VEHICLE (number) VALUES (?)', [num]);
    return { id: res.insertId, num };
}

export async function updateVehicle(id, num) {
    await pool.query('UPDATE Vehicle SET number = ? WHERE id = ?', [num, id]);
    return { id, num };
}

export async function deleteVehicle(id) {
    await pool.query('DELETE FROM Vehicle WHERE id = ?', [id]);
}

export async function createVehicleRequest(data) {
    await pool.query('INSERT INTO vehi_request (userId, divId, purpose, destination, distance, datetime, selfdrive) VALUES (?, ?, ?, ?, ?, ?, ?)', [data.userId, data.divId, data.pur, data.dest, data.dis, data.date, data.sel]);
}

export async function selVehicleRequest() {
    const query = `SELECT 
    vehi_request.*, 
    user.name AS 'name', 
    agency.name AS 'agency', 
    status.name AS 'status'
FROM 
    vehi_request
LEFT JOIN 
    user ON vehi_request.userId = user.id
LEFT JOIN 
    agency ON vehi_request.divId = agency.id
LEFT JOIN 
    status ON vehi_request.statusId = status.id
    `
    const [rows] = await pool.query(query);
    return rows;
}

export async function putVehicleRequest(id, data) {
    await pool.query('UPDATE vehi_request SET driverId = ?, vehicleId = ?, statusId = 1, remarks = ? WHERE id = ?', [data.driverId, data.vehicleId, data.remarks, id]);
}