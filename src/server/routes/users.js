import express from 'express'

import { createUser, readUsers, readUser, updateUser, deleteUser } from '../controllers/users';
export const router = express.Router();


// routing for crud operations for users
router.post('/', createUser);
router.get('/', readUsers);
router.get('/:id', readUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

//module.exports = router;