import {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
} from '../models/userModal.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function getUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getUser(req, res) {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createNewUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(username, email, hashedPassword);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateExistingUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await updateUser(req.params.id, username, email, hashedPassword);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function removeUser(req, res) {
    try {
        await deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isMatch = password === user.password;
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}