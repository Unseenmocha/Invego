import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path: '../../process.env'});
import mongoose from'mongoose';
//import auth from './middleware/auth.js';
// I don't know if we are allowed to use any more defined libraries
import logger from 'morgan'

import { userRoutes } from './routes/users.js';
import { portfolioRoutes } from './routes/portfolios.js';
import { pagesRouter } from './routes/pages.js';
import bodyParser from 'body-parser'
import cors from 'cors'; 

const app = express();
const port = process.env.PORT || 5000;


/*
   Here we add middleware e.g app.use(middleware)
*/

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(logger('dev'))

app.use(express.static('../client/'));

app.use('/user', userRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/page', pagesRouter);
app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
 });

/*
   Here we connect to the database 
*/

mongoose.connect(process.env.DB.toString(), { useNewUrlParser: true }).then(() => {
    console.log("Database successfully connected!");
    //start server
    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Start at http://localhost:${port}/page/login`)
    });
  })
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;


