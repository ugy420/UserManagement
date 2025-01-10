import express from 'express';
import {
    getUsers,
    getUser,
    createNewUser,
    updateExistingUser,
    removeUser
} from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createNewUser);
router.put('/users/:id', updateExistingUser);
router.delete('/users/:id', removeUser);

export default router;
