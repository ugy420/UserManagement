import pool from '../db.js';

// Function to fetch all users
export async function getAllUsers() {
    try {
        const [rows] = await pool.query('SELECT * FROM User');
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Error fetching users');
    }
}

// Function to fetch a user by ID
export async function getUserById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM User WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error(`User with ID ${id} not found`);
        }
        return rows[0];
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw new Error(`Error fetching user with ID ${id}`);
    }
}

// Function to create a new user
export async function createUser(username, email, password, agency_id, phone_number, cid) {
    try {
        const [result] = await pool.query(
            'INSERT INTO User (username, email, password, agency_id, phone_number, cid) VALUES (?, ?, ?, ?, ?, ?)', 
            [username, email, password, agency_id, phone_number, cid]
        );
        return { id: result.insertId, username, email, password, agency_id, phone_number, cid };
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    }
}

// Function to update a user's details
export async function updateUser(id, username, email, password, agency_id, phone_number, cid) {
    try {
        const [result] = await pool.query(
            'UPDATE User SET username = ?, email = ?, password = ?, agency_id = ?, phone_number = ?, cid = ? WHERE id = ?', 
            [username, email, password, agency_id, phone_number, cid, id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`User with ID ${id} not found or no changes were made`);
        }
        return { id, username, email, password, agency_id, phone_number, cid };
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw new Error(`Error updating user with ID ${id}`);
    }
}

// Function to delete a user by ID
export async function deleteUser(id) {
    try {
        const [result] = await pool.query('DELETE FROM User WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error(`User with ID ${id} not found`);
        }
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw new Error(`Error deleting user with ID ${id}`);
    }
}
