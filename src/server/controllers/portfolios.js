import { Types } from 'mongoose';
import { Portfolio } from '../models/portfolios.js';
import { Transaction } from '../models/transactions.js';
import { User } from '../models/users.js';

export const createPortfolioByUsername = async (req, res) => {
    // console.log("createPortfolioByID")
    // console.log("req", req);
    const portfolio = req; // make sure to pass in id in the request
    console.log("portfolio", portfolio);
    const newPortfolio = new Portfolio(portfolio);
    // console.log("made new portfolio");
    try {
        // console.log("about to save");
        await newPortfolio.save();
        // console.log("saved");
        //res.status(201).json(newPortfolio); // status is undefined so an error is thrown, but this still creates the portfolio
    } catch (error) {
        console.log("error " + error);
        res.status(409).json({ message: error.message });
    }
}

export const getPortfolioByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const portfolio = await Portfolio.findOne({username: username}).lean();
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

    const updatePortfolio = await databaseUpdatePortfolio(username, updates);

    res.status(200).json({status : "ok"});
    

    // try {
    //     const updatePortfolio = await databaseUpdatePortfolio(username, updates);
    //     res.send(updatePortfolio);
    // }  catch (error) {
    //     res.status(404).json({ message: error.message });
    // }
}

async function databaseUpdatePortfolio(username, updates) {
    return await Portfolio.update({username : username}, updates);
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


    const matches = Transaction.find({transactionType: 'SELL', username : req.username2, desiredPrice : {$lt:upperBoundPrice}});

    // find minimum difference in shares
    // go until no more matches, or all shares bought/sold

    for (let i = 0; i < matches.length && transaction.shares > 0; i++) {
        const match = matches[i];

        const remainder = transaction.shares - match.shares;
        const moreLeft = remainder > 0;
        const zeroLeft = remainder == 0;
        let netSingleTransaction = 0;
        
        if (zeroLeft || moreLeft) {
            // in these cases, remove SELL transaction
            netSingleTransaction -= match.shares * match.desiredPrice;
            await Transaction.find({ _id : match._id }).remove().exec();
            transaction.shares -= match.shares;

        } else {
            // in this case, update the SELL, end the user's buying
            await Transaction.findOneAndUpdate({ _id : match._id }, 
                {$inc : {shares: -transaction.shares}});

        }

        // charge buyer
        await resolveTransactionInUser(match.transactionOwner, -netSingleTransaction);

        // pay seller
        await resolveTransactionInUser(transaction.username1, netSingleTransaction);

        if (zeroLeft) {
            // stop iterating through matching transactions
            res.status(200).json({status : "ok"});
            return;
        }
    }

    // if remainder left, then post new transaction owned by buyer
    // only do this if you want to buy more than there is supply
    await createTransaction('BUY', transaction.username2, transaction,shares, transaction.desiredPrice, transaction.username1, transaction.username1);

    res.status(200).json({status : "ok"});
    return;
    

}

async function resolveTransactionInPortfolio(stockOwner, stock, netChange) {
    const portfolio = await Portfolio.findOne({username : stockOwner});

    let numShares = portfolio.stocks[stock].num_shares;
    numShares += netChange;

    if (numShares == 0) {
        delete portfolio.stocks[stock];
    } if (numShares < 0) {
        console.log("This should not happen!")
    } else {
        portfolio.stocks[stock].num_shares = numShares;
    }

    await Portfolio.findOneAndUpdate({username : stockOwner}, portfolio);
}

async function resolveTransactionInUser(username, netBittelChange) {
    update = {$inc : {bittels: netSingleTransaction}}
    User.findOneAndUpdate({username : username}, update);
}

async function createTransaction(type, ofUsername, shares, desiredPrice, transactionOwner, res) {
    const newTransaction = new Transaction({
        transactionType: Types,
        username: ofUsername,
        shares: shares,
        desiredPrice: desiredPrice,
        transactionOwner: transactionOwner
    });

    try {
        console.log("about to save");
        await newTransaction.save();
        console.log("saved");
        res.status(201).json({status : "ok"}); // status is undefined so an error is thrown, but this still creates the portfolio
    } catch (error) {
        console.log("error " + error);
        res.status(409).json({ message: error.message });
    }

}

export const sell = async (req, res) => {

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

    const sellersPortfolio = Portfolio.findOne({username : transaction.username1});
    
    if (!(transaction.username2 in sellersPortfolio.stocks) ||
        !(sellersPortfolio.stocks[transaction.username2] >= transaction.shares)) {
        console.log("Can not sell more than owned");
        res.status(400).json({message : "Can not sell more than owned."})
    }



    const lowerBoundPrice = transaction.requiredPrice * 0.95;


    const matches = Transaction.find({transactionType: 'BUY', username : req.username2, desiredPrice : {$gt:lowerBoundPrice}});

    // find minimum difference in shares
    // go until no more matches, or all shares bought/sold

    for (let i = 0; i < matches.length && transaction.shares > 0; i++) {
        const match = matches[i];

        const remainder = transaction.shares - match.shares;
        const moreLeft = remainder > 0;
        const zeroLeft = remainder == 0;
        let netSingleTransaction = 0;
        
        if (zeroLeft || moreLeft) {
            // in these cases, remove SELL transaction
            netSingleTransaction += match.shares * match.desiredPrice;
            await Transaction.find({ _id : match._id }).remove().exec();
            transaction.shares -= match.shares;

        } else {
            // in this case, update the SELL, end the user's buying
            await Transaction.findOneAndUpdate({ _id : match._id }, 
                {$inc : {shares: -transaction.shares}});

        }

        // pay seller
        await resolveTransactionInUser(match.transactionOwner, netSingleTransaction);

        // charge buyer (we will go into negatives for now)
        await resolveTransactionInUser(transaction.username1, -netSingleTransaction);

        if (zeroLeft) {
            // stop iterating through matching transactions
            res.status(200).json({status : "ok"});
            return;
        }
    }

    // if remainder left, then post new transaction owned by buyer
    // only do this if you want to buy more than there is supply
    await createTransaction('BUY', transaction.username2, transaction,shares, transaction.desiredPrice, transaction.username1, transaction.username1);

    res.status(200).json({status : "ok"});
    return;
    

}

