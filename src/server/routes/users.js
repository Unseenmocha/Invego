import express from 'express'

import { createUser, getUsers, getUserByID, updateUser, deleteUser, signup, login} from '../controllers/users.js';
export const userRoutes = express.Router();


// routing for crud operations for users
userRoutes.post('/', createUser);
userRoutes.get('/:id', getUserByID);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);
userRoutes.post('/signup', signup);
userRoutes.get('/', getUsers);
userRoutes.post('/login', login);

export default userRoutes;