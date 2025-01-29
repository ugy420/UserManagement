import {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
} from '../models/userModel.js';

import { sendWelcomeEmail } from '../emailService.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, name: user.name } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

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
      const { username, email, phone_number, cid, agency_id, createdBy } = req.body;
      const password = Math.random().toString(36).slice(-4);
      console.log(password);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser(username, email, hashedPassword, phone_number, cid, agency_id, createdBy);
  
      sendWelcomeEmail(email, username, password);
  
      res.status(201).json(newUser);
    } catch (error) {
      if (error.message.includes('already exists')) {
        return res.status(409).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

export async function updateExistingUser(req, res) {
    try {
        const { username, email, phone_number, cid, agency_id } = req.body;
        const updatedUser = await updateUser(req.params.id, username, email, phone_number, cid, agency_id);
        res.json(updatedUser);
    } catch (error) {
        if (error.message.includes('already exists')) {
            return res.status(400).json({ error: error.message });
        }
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

