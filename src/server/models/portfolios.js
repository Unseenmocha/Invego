// the models folder holds the course schema (structure of data stored in database) defined for each data type

import mongoose from 'mongoose';


const stockSchema = new mongoose.Schema({
    num_shares: { type: Number, required: true },
    purchase_price: { type: Number, required: true }
  });
  
const portfolioSchema = new mongoose.Schema({
    username: String, 
    stocks: { 
        type: Map,
        of: stockSchema
    }
});



export const Portfolio = mongoose.model('Portfolio', portfolioSchema)

