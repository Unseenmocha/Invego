import express from 'express'

import { createUser, getUsers, getUserByUsername, updateUser, deleteUser, signup, login} from '../controllers/users.js';
export const userRoutes = express.Router();


// routing for crud operations for users
userRoutes.post('/', createUser);
userRoutes.get('/:username', getUserByUsername);
userRoutes.put('/:username', updateUser);
userRoutes.delete('/:username', deleteUser);
userRoutes.post('/signup', signup);
userRoutes.get('/', getUsers);
userRoutes.post('/login', login);

export default userRoutes;