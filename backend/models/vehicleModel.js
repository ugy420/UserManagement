import pool from '../db.js';

export async function getAllVehicles(){
    const [rows] = await pool.query('SELECT * FROM Vehicle');
    return rows;
}

export async function createVehicle(num){
    const [res] = await pool.query('INSERT INTO VEHICLE (number) VALUES (?)', [num]);
    return {id: res.insertId, num};
}

export async function updateVehicle(id, num){
    await pool.query('UPDATE Vehicle SET number = ? WHERE id = ?', [num, id]);
    return {id, num};
}

export async function deleteVehicle(id){
    await pool.query('DELETE FROM Vehicle WHERE id = ?', [id]);
}

export async function createVehicleRequest(data){
    await pool.query('INSERT INTO vehi_request (userId, divId, purpose, destination, distance, datetime, selfdrive) VALUES (?, ?, ?, ?, ?, ?, ?)', [data.userId, data.divId, data.pur, data.dest, data.dis, data.date, data.sel]);
}