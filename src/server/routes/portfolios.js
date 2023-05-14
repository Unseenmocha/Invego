import express from 'express'

import { createPortfolioByID, getPortfolioByID, updatePortfolio, buy, sell, deletePortfolio } from '../controllers/portfolios.js';
//import { auth }  from '../middleware/auth.js';


export const portfolioRoutes = express.Router();


// routing for crud operations for within the portfolio
portfolioRoutes.post('/:username', /*auth, */ createPortfolioByUsername);
portfolioRoutes.get('/:username', /*auth, */ getPortfolioByUsername);
portfolioRoutes.put('/:username', /*auth, */ updatePortfolio);
portfolioRoutes.put('/buy/:username', /*auth, */ buy);
portfolioRoutes.put('/sell/:username', /*auth, */ sell);
portfolioRoutes.delete('/:username', /*auth, */ deletePortfolio);

export default portfolioRoutes;



