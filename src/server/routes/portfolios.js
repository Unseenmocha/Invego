import express from 'express'

import { createPortfolioByUsername, getPortfolioByUsername, updatePortfolio, buy, sell, deletePortfolio } from '../controllers/portfolios.js';
//import { auth }  from '../middleware/auth.js';


export const portfolioRoutes = express.Router();


// routing for crud operations for within the portfolio
portfolioRoutes.post('/:username', /*auth, */ createPortfolioByUsername);
portfolioRoutes.get('/:username', /*auth, */ getPortfolioByUsername);
portfolioRoutes.put('/buy', /*auth, */ buy);
portfolioRoutes.put('/sell', /*auth, */ sell);
portfolioRoutes.put('/:username', /*auth, */ updatePortfolio);
portfolioRoutes.delete('/:username', /*auth, */ deletePortfolio);

export default portfolioRoutes;



