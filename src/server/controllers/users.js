import { User } from '../models/user.js';

// this file sends the json files to the frontend for each of the crud operations


const readUsers = async (req, res) => {
    try {
        const users = await User.find(); // find() is a mongoose method
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    try {
        await newUser.save(); 
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


/* 
    write more crud operations
*/