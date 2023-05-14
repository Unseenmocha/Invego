import { Portfolio } from '../models/portfolios.js';

export const createPortfolioByUsername = async (req, res) => {
    console.log("createPortfolioByID")
    console.log("req", req);
    const portfolio = req; // make sure to pass in id in the request
    console.log("portfolio", portfolio);
    const newPortfolio = new Portfolio(portfolio);
    console.log("made new portfolio");
    try {
        console.log("about to save");
        await newPortfolio.save();
        console.log("saved");
        //res.status(201).json(newPortfolio); // status is undefined so an error is thrown, but this still creates the portfolio
    } catch (error) {
        console.log("error " + error);
        res.status(409).json({ message: error.message });
    }
}

export const getPortfolioByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const portfolio = await Portfolio.findOne({username: username});
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deletePortfolio = async (req, res) => {
    const username = req.params.username;
    try {
        await Portfolio.remove({ username : username}).exec();
        res.send('Successfully deleted!');
    } catch (error) {
        console.log(error);
    }
}

export const updatePortfolio = async (req, res) => {
    const username = req.params.username;
    const updates = req.body;
    try {
        const updatePortfolio = await Portfolio.update({username : username}, updates);
        res.send(updatePortfolio);
    }  catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const buy = async (req, res) => {
    // will do stuff with transactions --> or should there be a route for transactions that does this? 


}

export const sell = async (req, res) => {

}