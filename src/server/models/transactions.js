// the models folder holds the course schema (structure of data stored in database) defined for each data type

import mongoose from 'mongoose';


export const transactionSchema = mongoose.Schema({
    stocks: { 
        type: Map,
        of: stockSchema
    }
});


export const User = mongoose.model('Transaction', transactionSchema)

//module.exports = { User, userSchema };