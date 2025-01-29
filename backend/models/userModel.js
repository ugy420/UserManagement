import { query } from 'express';
import pool from '../db.js';

// Function to fetch all users
export async function getAllUsers() {
    try {
        const query = `
         SELECT 
                u.id, 
                u.name, 
                u.email,
                u.phone,
                u.cid,
                u.createdBy,
                u.createdDate,
                a.name as agency_name
            FROM 
                User u
            LEFT JOIN 
                Agency a ON u.agencyId = a.id
        `;
        const [rows] = await pool.query(query);
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

export async function createUser(username, email, password, phone, cid, agency_id, createdBy) {
    try {
        const [result] = await pool.query(
            'INSERT INTO User (name, email, password, phone, cid, agencyId, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [username, email, password, phone, cid, agency_id, createdBy]
        );
        return { id: result.insertId, username, email, password, phone, cid, agency_id, createdBy };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            if (error.message.includes('email')) {
                throw new Error('Email already exists');
            } else if (error.message.includes('phone')) {
                throw new Error('Phone number already exists');
            } else if (error.message.includes('cid')) {
                throw new Error('CID already exists');
            }
        }
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    }
}

export async function updateUser(id, username, email, phone_number, cid, agency_id) {
    try {
        const [result] = await pool.query(
            'UPDATE User SET name = ?, email = ?, phone = ?, cid = ?,  agencyId = ?  WHERE id = ?', 
            [username, email, phone_number, cid, agency_id, id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`User with ID ${id} not found or no changes were made`);
        }
        return { id, username, email, phone_number, cid, agency_id };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            if (error.message.includes('email')) {
                throw new Error('Email already exists');
            } else if (error.message.includes('phone')) {
                throw new Error('Phone number already exists');
            } else if (error.message.includes('cid')) {
                throw new Error('CID already exists');
            }
        }
        console.error(`Error updating user with ID ${id}:`, error);
        throw new Error(`Error updating user with ID ${id}`);
    }
}


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