import { Portfolio } from '../models/portfolios.js';

export const getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.find();
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
