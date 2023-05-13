// the models folder holds the course schema (structure of data stored in database) defined for each data type

import mongoose from 'mongoose';


const stockSchema = new mongoose.Schema({
    num_shares: { type: Number, required: true },
    purchase_price: { type: Number, required: true }
  });
  
const portfolioSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // needs to be explicitly added in order to be the same as the user
    stocks: { 
        type: Map,
        of: stockSchema
    }
});



export const Portfolio = mongoose.model('Portfolio', portfolioSchema)

