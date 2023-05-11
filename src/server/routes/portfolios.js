import express from 'express'

import { createPortfolio, readPortfolio, updatePortfolio, buy, sell, deletePortfolio } from '../controllers/portfolios.js';
import { auth }  from '../middleware/auth.js';


export const portfolioRoutes = express.Router();


// routing for crud operations for within the portfolio
router.post('/', auth, createPortfolio);
router.get('/:id', auth, readPortfolio);
router.put('/:id', auth, updatePortfolio);
router.put('/buy/:id', auth, buy);
router.put('/sell/:id', auth, sell);
router.delete('/:id', auth, deletePortfolio);

export default portfolioRoutes;


