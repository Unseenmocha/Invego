import express from 'express';

import { getBuySell, getLogin, getDiscovery, getUserProfile } from '../controllers/pages.js';

export const pagesRouter = express.Router();


pagesRouter.get('/login', getLogin);
pagesRouter.get('/discovery', getDiscovery);
pagesRouter.get('/buySell', getBuySell);
pagesRouter.get('/userProfile', getUserProfile);


export default pagesRouter;