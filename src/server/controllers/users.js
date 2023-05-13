import { User } from '../models/users.js';
import { createPortfolioByID } from './portfolios.js';

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
    console.log("create user")
    const user = req.body;
    const newUser = new User(user);
    console.log("newUser")
    try {
        await newUser.save();
        console.log("newUser after save", newUser);
        await createPortfolioByID({_id : newUser._id, stocks : {}})
        res.status(201).json(newUser);
        console.log("create user res.body", res.json());
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
    console.log(req);
    const id = req.params.id;
    const updates = req.body;
    console.log(updates);
    try {
        const updateUser = await User.findByIdAndUpdate(id, updates);
        res.send(updateUser);
    }  catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.findOne({ username: username }, function (err, user) {
        if (user.password === password) {
            res.send({ok: true, user:user});
        } else {
            res.status(401).json({message: "Incorrect username or password"});
        }
    });
}

export const signup = async (req, res) => {
    console.log("signup req res", req, res);

    // 1. make sure there are no duplicate usernames
    const username = req.body.username;
    const password = req.body.password;
    /* there might be other fields here stored in the body, like first_name, last_name
     * those are just put in through the body, but not required for this signup function
    */
    const usernameAlreadyUsed = await User.exists({ username: username });

    if (usernameAlreadyUsed) {
        res.status(409).json({message: "Username taken"});
    } else {
        
        const response = await createUser(req, res);
        // creating portfolio within createUser call

        //console.log(response)
        //const portfolioRequest = {_id: res._id, stocks: {}}
        //await createPortfolioByID(portfolioRequest)
        //res.body = response.body;
    }

    

}

