import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../models/userModel.js';

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
        const { username, email } = req.body;
        if (!username || !email) {
            return res.status(400).json({ error: "Username and email are required" });
        }
        const newUser = await createUser(username, email);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateExistingUser(req, res) {
    try {
        const { username, email } = req.body;
        if (!username || !email) {
            return res.status(400).json({ error: "Username and email are required" });
        }
        const updatedUser = await updateUser(req.params.id, username, email);
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
