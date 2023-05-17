import { Types } from 'mongoose';
import { Portfolio } from '../models/portfolios.js';
import { Transaction } from '../models/transactions.js';
import { User } from '../models/users.js';

export const createPortfolioByUsername = async (req, res) => {
    // console.log("createPortfolioByID")
    // console.log("req", req);
    const portfolio = req; // make sure to pass in id in the request
    // console.log("portfolio", portfolio);
    const newPortfolio = new Portfolio(portfolio);
    // console.log("made new portfolio");
    try {
        // console.log("about to save");
        await newPortfolio.save();
        // console.log("saved");
        //res.status(201).json(newPortfolio); // status is undefined so an error is thrown, but this still creates the portfolio
    } catch (error) {
        // console.log("error " + error);
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
    return await Portfolio.updateOne({username : username}, updates);
}

export const buy = async (req, res) => {

    // check if SELL transaction exists for same username, try to get close to the number of stocks/price
    
    /* 
    req.body should have:
    {
        username1: the current user
        // username2: the user to buy from // nevermind, the user doesn't determine who they buy from
        username2: the user stock
        desiredPrice: the desired price
        shares: the number of shares bought/sold

    }
    */

    // const transaction = req.body;
    //console.log(req.body);
    // const test1 = await Transaction.find({transactionType : 'SELL'}).lean();
    // console.log("req username2", req.body.username2);
    // const test2 = await Transaction.find({username : req.body.username2}).lean();
    // const test3 = await Transaction.find({desiredPrice : {$lte : req.body.desiredPrice}}).lean();
    // console.log("test1", test1);
    // console.log("test2", test2);
    // console.log("test3", test3);
    // const test4 = await Transaction.find({transactionType: 'SELL', username : transaction.username2, desiredPrice : {$lte : transaction.desiredPrice}}).lean();
    // console.log("test4", test4);

    const transaction = req.body;
    // console.log(transaction);


    try {
        const matches = await Transaction.find({transactionType: 'SELL', username : transaction.username2, desiredPrice : {$lte : transaction.desiredPrice}}).lean();

        //console.log("matches", matches)

        // find minimum difference in shares
        // go until no more matches, or all shares bought/sold

        for (let i = 0; i < matches.length && transaction.shares > 0; i++) {
            const match = matches[i];
            let netChange = 0;

            const remainder = transaction.shares - match.shares;
            const moreLeft = remainder > 0;
            const zeroLeft = remainder == 0;
            let netSingleTransaction = 0;
            
            //console.log("zeroLeft", zeroLeft, "moreLeft", moreLeft)
            if (zeroLeft || moreLeft) {
                // console.log("more or zero left");
                // in these cases, remove SELL transaction
                netSingleTransaction -= match.shares * match.desiredPrice;
                await Transaction.deleteOne({ _id : match._id });
                transaction.shares -= match.shares;
                netChange = match.shares;

            } else {
                // console.log("seller has more than buyer wants to buy");
                // in this case, update the SELL, end the user's buying
                netSingleTransaction -= transaction.shares * match.desiredPrice;
                await Transaction.findOneAndUpdate({ _id : match._id }, 
                    {$inc : {shares: -transaction.shares}});
                netChange = transaction.shares;
                transaction.shares = 0;

            }

            // charge buyer
            // console.log("charge buyer");
            await resolveTransactionInUser(transaction.username1, -netSingleTransaction);
            await resolveTransactionInPortfolio(transaction.username1, transaction.username2, netChange, match.desiredPrice);

            // pay seller
            // console.log("pay seller");
            await resolveTransactionInUser(match.transactionOwner, netSingleTransaction);
            await resolveTransactionInPortfolio(match.transactionOwner, transaction.username2, -netChange, match.desiredPrice);

            if (zeroLeft || transaction.shares == 0) {
                // stop iterating through matching transactions
                // console.log("zero left -> return");
                res.status(200).json({status: "OK", message : "Buy order created."});
                return;
            }
        }  
    } catch (err) {
      console.log(err);          
    }

    // console.log("BUY not satisfied, post");

    // if remainder left, then post new transaction owned by buyer
    // only do this if you want to buy more than there is supply
    await createTransaction('BUY', transaction.username2, transaction.shares, transaction.desiredPrice, transaction.username1, transaction.username1);

    res.status(200).json({status : "OK", message : "Buy order created."});
    return;
    

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

    const transaction = req.body;

    const sellersPortfolio = await Portfolio.findOne({username : transaction.username1}).lean();
    console.log("sellersPortfolio", sellersPortfolio);

    const hasStockShare = (transaction.username2 in sellersPortfolio.stocks);
    // console.log(sellersPortfolio.stocks[transaction.username2]);
    const hasEnoughShares = hasStockShare ? (sellersPortfolio.stocks[transaction.username2].num_shares >= transaction.shares) : false

    // console.log("hasStockShare", hasStockShare)
    // console.log("hasEnoughShares", hasEnoughShares);

    if (!hasStockShare || !hasEnoughShares){
        // console.log("Can not sell more than owned");
        res.status(400).json({status: "FAILURE", message : "You can not sell more shares than you own."})
        return;
    }



    // clearly I am working with queries incorrectly -> this returns a query object
    const matches = await Transaction.find({transactionType: 'BUY', username : transaction.username2, desiredPrice : {$gte : transaction.desiredPrice}}).lean();

    // find minimum difference in shares
    // go until no more matches, or all shares bought/sold

    for (let i = 0; i < matches.length && transaction.shares > 0; i++) {
        const match = matches[i];
        let netChange = 0;
        
        const remainder = transaction.shares - match.shares;
        const moreLeft = remainder > 0;
        const zeroLeft = remainder == 0;
        let netSingleTransaction = 0;

        // console.log("zeroLeft", zeroLeft, "moreLeft", moreLeft);

        
        if (zeroLeft || moreLeft) {
            // in these cases, remove SELL transaction
            netSingleTransaction += match.shares * match.desiredPrice;
            await Transaction.deleteOne({ _id : match._id });
            transaction.shares -= match.shares;
            netChange = match.shares;

        } else {
            // in this case, update the SELL, end the user's buying
            netSingleTransaction -= transaction.shares * match.desiredPrice;
            await Transaction.findOneAndUpdate({ _id : match._id }, 
                {$inc : {shares: -transaction.shares}});
            netChange = transaction.shares;
            transaction.shares = 0;

        }

        // pay seller 
        // console.log("pay seller");
        await resolveTransactionInUser(transaction.username1, netSingleTransaction);
        await resolveTransactionInPortfolio(transaction.username1, transaction.username2, -netChange, match.desiredPrice);

        // charge buyer
        // console.log("charge buyer");
        await resolveTransactionInUser(match.transactionOwner, -netSingleTransaction);
        await resolveTransactionInPortfolio(match.transactionOwner, transaction.username2, netChange, match.desiredPrice);

        if (zeroLeft || transaction.shares == 0) {
            // stop iterating through matching transactions
            // console.log("zero left -> return");
            res.status(200).json({status: "OK", message : "Sale order created."});
            return;
        }
    }

    // if remainder left, then post new transaction owned by buyer
    // only do this if you want to buy more than there is supply
    // console.log("posting SELL");
    await createTransaction('SELL', transaction.username2, transaction.shares, transaction.desiredPrice, transaction.username1, transaction.username1);

    res.status(200).json({status: "OK", message : "Sale order created."});
    return;
    

}

async function resolveTransactionInPortfolio(stockOwner, stock, netChange, purchasePrice) {
    // console.log("resolve for portfolio", stockOwner, stock, netChange);
    const portfolio = await Portfolio.findOne({username : stockOwner}).lean();
    // console.log(portfolio.stocks);
    // console.log(portfolio.stocks[stock]);
    // console.log("portfolio", stockOwner, "->", portfolio);

    // if they don't own the stock yet
    if (!(stock in portfolio.stocks)) {
        // console.log("adding stock");
        if (purchasePrice == null) {
            // console.log("purchasePrice null for ", stockOwner, stock, netChange, purchasePrice);
        }
        portfolio.stocks[stock] = {num_shares : 0, purchase_price : purchasePrice};
    }

    let numShares = portfolio.stocks[stock].num_shares;
    numShares += netChange;

    if (numShares == 0) {
        delete portfolio.stocks[stock];
    } if (numShares < 0) {
        // console.log("This should not happen!")
    } else {
        portfolio.stocks[stock].num_shares = numShares;
    }

    await Portfolio.findOneAndUpdate({username : stockOwner}, portfolio);
}

async function resolveTransactionInUser(username, netBittelChange) {
    console.log("resolving transaction in user", username, netBittelChange);

    const user = await User.findOne({username : username});
    console.log("before user", user);
    const bittels = user.bittels + netBittelChange;
    user.bittels = bittels;

    console.log("in resolve for user", user);

    await User.findOneAndUpdate({username : username}, user);
}

async function createTransaction(type, ofUsername, shares, desiredPrice, transactionOwner, res) {
    const newTransaction = new Transaction({
        transactionType: type,
        username: ofUsername,
        shares: shares,
        desiredPrice: desiredPrice,
        transactionOwner: transactionOwner
    });

    //try {
        // console.log("about to save");
        await newTransaction.save();
        // console.log("saved");
    //     res.status(201).json({status : "ok"}); // status is undefined so an error is thrown, but this still creates the portfolio
    // } catch (error) {
    //     // console.log("error " + error);
    //     res.status(409).json({ message: error.message });
    // }

}



