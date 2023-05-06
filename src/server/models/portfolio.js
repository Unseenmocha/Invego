// the models folder holds the course schema (structure of data stored in database) defined for each data type

import mongoose from 'mongoose';


export const portfolioSchema = mongoose.Schema({
    _id: Number,
    market_value: Number,
    total_shares: Number,
    percent_growth: String,
    stocks: 
});


export const Portfolio = mongoose.model('Portfolio', portfolioSchema)

