import { Portfolio } from '../models/portfolios.js';

export const getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.find();
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPortfolio = async (req, res) => {
    const portfolio = req.body;
    const newPortfolio = new Portfolio(portfolio);
    try {
        await newPortfolio.save();
        res.status(201).json(newPortfolio);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePortfolio = async (req, res) => {
    const id = req.params.id;
    try {
        await Portfolio.findByIdAndRemove(id).exec();
        res.send('Successfully deleted!');
    } catch (error) {
        console.log(error);
    }
}

export const updatePortfolio = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatePortfolio = await Portfolio.findByIdAndUpdate(id, updates);
        res.send(updatePortfolio);
    }  catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const buy = async (req, res) => {
}

export const sell = async (req, res) => {
}