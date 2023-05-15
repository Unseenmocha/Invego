// the models folder holds the course schema (structure of data stored in database) defined for each data type

import mongoose from 'mongoose';


export const userSchema = mongoose.Schema({
    // _id: String,        
    first_name: String,
    last_name: String,
    bio: String,
    username: String,
    password: String,
    bittels: Number,
    market_value: Number,
    total_shares: Number,
    total_shares_owned: Number
});


export const User = mongoose.model('User', userSchema)

//module.exports = { User, userSchema };