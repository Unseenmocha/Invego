import express from 'express';
import mongoose from'mongoose'; // are we using mongoose?
// I don't know if we are allowed to use any more defined libraries

const userRoutes = require('./routes/users.js'); // I'm not sure how to convert this syntax to the import syntax, or whether it is necessary
const portfolioRoutes = require('./routes/professors.js');


const app = express();


/*
   Here we should add middleware e.g app.use(middleware)
*/


app.use('/user', userRoutes);
app.use('/portfolio', portfolioRoutes);

/*
   Here we should connect to the database 
*/

