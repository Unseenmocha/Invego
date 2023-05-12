import { User } from '../models/users.js';

// this file sends the json files to the frontend for each of the crud operations


export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserByID = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
};

export const createUser = async (req, res) => {
    const User = req.body;
    const newUser = new User(User);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndRemove(id).exec();
        res.send('Successfully deleted!');
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id, updates);
        res.send(updateUser);
    }  catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const login = async (req, res) => {

}

export const signup = async (req, res) => {

}

