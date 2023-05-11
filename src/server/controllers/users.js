import { User } from '../models/users.js';

// this file sends the json files to the frontend for each of the crud operations


const readUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


/* 
    write more crud operations
*/