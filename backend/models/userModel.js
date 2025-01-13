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

// Function to fetch a user by email
export async function getUserByEmail(email) {
    try {
        const [rows] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
        if (rows.length === 0) {
            throw new Error(`User with email ${email} not found`);
        }
        return rows[0];
    } catch (error) {
        console.error(`Error fetching user with email ${email}:`, error);
        throw new Error(`Error fetching user with email ${email}`);
    }
}

// Function to create a new user
export async function createUser(username, email, password) {
    try {
        const [result] = await pool.query(
            'INSERT INTO User (username, email, password) VALUES (?, ?, ?)', 
            [username, email, password]
        );
        return { id: result.insertId, username, email, password };
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    }
}

// Function to update a user's details
export async function updateUser(id, username, email, password) {
    try {
        const [result] = await pool.query(
            'UPDATE User SET username = ?, email = ?, password = ? WHERE id = ?', 
            [username, email, password, id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`User with ID ${id} not found or no changes were made`);
        }
        return { id, username, email, password };
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