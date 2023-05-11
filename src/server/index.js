import express from 'express';
import mongoose from'mongoose'; // are we using mongoose?
// I don't know if we are allowed to use any more defined libraries

import { userRoutes } from './routes/users.js';
import { portfolioRoutes } from './routes/portfolios.js';

const app = express();


/*
   Here we should add middleware e.g app.use(middleware)
*/


app.use('/user', userRoutes);
app.use('/portfolio', portfolioRoutes);

/*
   Here we should connect to the database 
*/

