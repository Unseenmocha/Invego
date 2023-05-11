import express from 'express'

import { createUser, readUsers, readUser, updateUser, deleteUser, signup, login} from '../controllers/users.js';
export const userRoutes = express.Router();


// routing for crud operations for users
router.post('/', createUser);
router.get('/', readUsers);
router.get('/:id', readUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/signup', signup);
router.get('/login', login);

export default userRoutes;