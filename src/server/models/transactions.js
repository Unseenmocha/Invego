// the models folder holds the course schema (structure of data stored in database) defined for each data type

import mongoose from 'mongoose';


export const transactionSchema = mongoose.Schema({
    transactionType: String, // 'BUY' or 'SELL'
    username: String, 
    shares: Number, 
    desiredPrice: Number, 
    transactionOwner: String
});


export const Transaction = mongoose.model('Transaction', transactionSchema)

//module.exports = { User, userSchema };