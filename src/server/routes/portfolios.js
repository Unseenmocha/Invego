import express from 'express'

import { createPortfolio, readPortfolio, updatePortfolio, buy, sell, deletePortfolio } from '../controllers/users';
export const router = express.Router();


// routing for crud operations for within the portfolio
router.post('/', createPortfolio);
router.get('/:id', readPortfolio);
router.put('/:id', updatePortfolio);
router.put('/buy/:id', buy);
router.put('/sell/:id', sell);
router.delete('/:id', deletePortfolio);

