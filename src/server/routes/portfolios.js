import express from 'express'

import { createPortfolioByID, getPortfolioByID, updatePortfolio, buy, sell, deletePortfolio } from '../controllers/portfolios.js';
//import { auth }  from '../middleware/auth.js';


export const portfolioRoutes = express.Router();


// routing for crud operations for within the portfolio
portfolioRoutes.post('/:id', /*auth, */ createPortfolioByID);
portfolioRoutes.get('/:id', /*auth, */ getPortfolioByID);
portfolioRoutes.put('/:id', /*auth, */ updatePortfolio);
portfolioRoutes.put('/buy/:id', /*auth, */ buy);
portfolioRoutes.put('/sell/:id', /*auth, */ sell);
portfolioRoutes.delete('/:id', /*auth, */ deletePortfolio);

export default portfolioRoutes;



