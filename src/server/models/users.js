// the models folder holds the course schema (structure of data stored in database) defined for each data type

import mongoose from 'mongoose';
import crypto from 'crypto';

export const userSchema = mongoose.Schema({
    // _id: String,        
    first_name: String,
    last_name: String,
    bio: String,
    username: String,
    password: String,
    salt: String,
    bittels: Number,
    market_value: Number,
    total_shares: Number,
    total_shares_owned: Number
});


userSchema.methods.setPassword = function (pass) {

    // Creating a unique salt for a particular user
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations,
    //64 length and sha512 digest
    this.password = crypto.pbkdf2Sync(pass, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

export const User = mongoose.model('User', userSchema)

//module.exports = { User, userSchema };