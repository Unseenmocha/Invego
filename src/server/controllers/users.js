import { User } from '../models/users.js';
import { createPortfolioByUsername } from './portfolios.js';
import { Portfolio } from '../models/portfolios.js';
import crypto from 'crypto';

// this file sends the json files to the frontend for each of the crud operations


function validPassword(password, stored_pass, salt) {
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return stored_pass === hash;
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({username : username});  
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error});
        console.log(error);
    }
};

export const getTopFiveUsers = async (req, res) => {
    try {
        const users = await User.find().sort({market_value: -1}).limit(5);
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({message: error});
        console.log(error);
    }
}


export const createUser = async (req, res) => {
    console.log("create user")
    console.log(req.body);
    const user = {
        bio: "Write something about yourself!",
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        salt:"",
        bittels: 500,
        market_value: 50,
        total_shares: 100,
        total_shares_owned: 0,
    };

    const usernameAlreadyUsed = await User.exists({ username : req.body.username });
    if (usernameAlreadyUsed) {
        res.status(409).send({stauts: "FAILURE", message: `Username ${req.body.username} taken. Please try another.`})
    }

    const newUser = new User(user);
    newUser.setPassword(user.password);
    try {
        await newUser.save();       
        console.log("newUser after save", newUser);
        const stocks = {}
        stocks[newUser.username] = {num_shares: 100, purchase_price: 50};
        const portfolio = {
            username : newUser.username, 
            stocks : stocks
        };
        await createPortfolioByUsername(portfolio, res);
        res.status(201).json({status: "OK", message:"Account creation success. Welcome to Invego!", newUser: newUser});
        console.log("create user res.body", res.json());
    } catch (error) {
        console.log(error);
        res.status(409).json({ status: "FAILURE", message: error.message });
    }
}


export const deleteUser = async (req, res) => {
    const username = req.params.username;
    try {
        await User.deleteOne({username : username}).exec();
        await Portfolio.deleteOne({username : username}).exec();
        res.send('Successfully deleted!');
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (req, res) => {
    const username = req.params.username; //current username
    const updates = req.body;
    let existingUser = username !== updates.username && await User.exists({ username: updates.username });
    try {
        if (existingUser) {
            res.status(409).send({message: `Username ${updates.username} is taken. Please try another.`})
        } else {
            const updateUser = await User.updateOne({username : username}, updates);
            res.send(updateUser);
        }
    }  catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    console.log("started login");
    const username = req.body.username;
    const password = req.body.password;

    try {
        const foundUser = await User.findOne({ username: username }).lean();
        if (validPassword(password, foundUser.password, foundUser.salt)) {
            res.status(200).json( foundUser );
        } else {
            console.log("incorrect password")
            res.status(401).json({message: "Incorrect username or password"});
        }
    } catch (err) {
        console.log("incorrect other issue")
        console.log("error: " + err.message);
        res.status(401).json({message: "Incorrect username or password"});
    }
}

// export const signup = async (req, res) => {
//     console.log("signup req res", req, res);

//     // 1. make sure there are no duplicate usernames
//     const user = req.body;
//     const username = user.username;
//     const password = user.password;
//     /* there might be other fields here stored in the body, like first_name, last_name
//      * those are just put in through the body, but not required for this signup function
//     */
//     const usernameAlreadyUsed = await User.exists({ username : username });

//     if (usernameAlreadyUsed) {
//         res.status(409).json({message: "Username taken"});
//     } else {
        
//         const response = await createUser(req, res);
//         // creating portfolio within createUser call

//         //console.log(response)
//         //const portfolioRequest = {_id: res._id, stocks: {}}
//         //await createPortfolioByID(portfolioRequest)
//         //res.body = response.body;
//     }

    

// }

