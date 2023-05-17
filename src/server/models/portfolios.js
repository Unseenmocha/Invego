// the models folder holds the course schema (structure of data stored in database) defined for each data type

import mongoose from 'mongoose';


const stockSchema = new mongoose.Schema({
    num_shares: { type: Number, required: true },
    purchase_price: { type: Number, required: true }
  });
  
const portfolioSchema = new mongoose.Schema({
    username: String, 
    stocks: {
        type: mongoose.Schema.Types.Mixed // these should all follow the stockSchema, but it is easier to say this is 'mixed'
    }
});



export const Portfolio = mongoose.model('Portfolio', portfolioSchema)

