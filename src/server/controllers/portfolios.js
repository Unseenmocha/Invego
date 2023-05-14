import { Portfolio } from '../models/portfolios.js';
import { Transaction } from '../models/transactions.js';
import { User } from '../models/users.js';

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
        const portfolio = await Portfolio.findOne({ username: username });
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deletePortfolio = async (req, res) => {
    const username = req.params.username;
    try {
        await Portfolio.remove({ username: username }).exec();
        res.send('Successfully deleted!');
    } catch (error) {
        console.log(error);
    }
}

export const updatePortfolio = async (req, res) => {
    const username = req.params.username;
    const updates = req.body;
    try {
        const updatePortfolio = await Portfolio.update({ username: username }, updates);
        res.send(updatePortfolio);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const buy = async (req, res) => {

    // check if SELL transaction exists for same username, try to get close to the number of stocks/price

    /* 
    req should have:
    {
        username1: the current user
        // username2: the user to buy from // nevermind, the user doesn't determine who they buy from
        username2: the user stock
        desiredPrice: the desired price
        shares: the number of shares bought/sold

    }
    */

    const transaction = req;
    const upperBoundPrice = transaction.requiredPrice * 1.05;
    let netBittels = 0; // price difference after all transactions are completed

    const matches = Transaction.find({ transactionType: 'SELL', username: req.username2, desiredPrice: { $lt: upperBoundPrice } });

    // find minimum difference in shares
    // go until no more matches, or all shares bought/sold

    for (let i = 0; i < matches.length && transaction.shares > 0; i++) {
        const match = matches[i];
        // loop start


        const remainder = transaction.shares - match.shares;
        const moreLeft = remainder > 0;
        const exactZero = remainder == 0;
        let netSingleTransaction = 0;

        if (exactZero) {
            // delete this match and stop
            netSingleTransaction -= match.shares * match.desiredPrice;
            netBittels += netSingleTransaction

            Transaction.find({ _id: match._id }).remove().exec();

            return;


        } else if (moreLeft) {
            // delete this match and continue
            netSingleTransaction -= match.shares * match.desiredPrice;
            netBittels += netSingleTransaction;

            Transaction.find({ _id: match._id }).remove().exec();


        } else {
            // update this match and stop 
            // buyer wants no more shares; seller has more to sell
            netSingleTransaction -= match.shares * transaction.shares;
            netBittels += netSingleTransaction;

            updateShares = { shares: match.shares - transaction.shares }
            Transaction.findOneAndUpdate({ _id: match._id }, updateShares);

        }

        // pay seller
        updateSeller = { $inc: { bittels: -netSingleTransaction } }
        User.findOneAndUpdate({ username: match.transactionOwner }, updateSeller);

        // charge buyer (we will go into negatives for now)
        updateBuyer = { $inc: { bittels: netSingleTransaction } }
        User.findOneAndUpdate({ username: transaction.username1 }, updateBuyer);


    }


    // if remainder left, then post new transaction
}

export const sell = async (req, res) => {

    // check if BUY transaction exists for same username, try to get close to the number of stocks
    /* 
    req should have:
    {
        username1: the current user
        // username2: the user to buy from // nevermind, the user doesn't determine who they buy from
        username2: the user stock
        desiredPrice: the desired price
        shares: the number of shares bought/sold

    }
    */

    const transaction = req;
    const lowerBoundPrice = transaction.requiredPrice * 0.95;
    let netBittels = 0; // price difference after all transactions are completed

    const matches = Transaction.find({ transactionType: 'BUY', username: req.username2, desiredPrice: { $gt: lowerBoundPrice } });

    // find minimum difference in shares
    // go until no more matches, or all shares bought/sold

    for (let i = 0; i < matches.length && transaction.shares > 0; i++) {
        const match = matches[i];
        // loop start


        const remainder = transaction.shares - match.shares;
        const moreLeft = remainder > 0;
        const exactZero = remainder == 0;
        let netSingleTransaction = 0;

        if (exactZero) {
            // delete this match and stop
            netSingleTransaction += match.shares * match.desiredPrice;
            netBittels += netSingleTransaction

            Transaction.find({ _id: match._id }).remove().exec();



        } else if (moreLeft) {
            // delete this match and continue
            netSingleTransaction += match.shares * match.desiredPrice;
            netBittels += netSingleTransaction;

            Transaction.find({ _id: match._id }).remove().exec();


        } else {
            // update this match and stop 
            // buyer wants no more shares; seller has more to sell
            netSingleTransaction += match.shares * transaction.shares;
            netBittels += netSingleTransaction;

            updateShares = { shares: match.shares - transaction.shares }
            Transaction.findOneAndUpdate({ _id: match._id }, updateShares);

        }

        // pay seller
        updateSeller = { $inc: { bittels: -netSingleTransaction } }
        User.findOneAndUpdate({ username: match.transactionOwner }, updateSeller);

        // charge buyer (we will go into negatives for now)
        updateBuyer = { $inc: { bittels: netSingleTransaction } }
        User.findOneAndUpdate({ username: transaction.username1 }, updateBuyer);

        if (exactZero) {
            return;
        }
    }

}