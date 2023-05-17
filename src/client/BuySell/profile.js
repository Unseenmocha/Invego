// Because of how we set up our Express server, we are able to visit this page by adding "/post/:postId" to our url in the browser.
// Because of this, we can grab the ID from the URL and use it to perform operations:
const postId = window.location.pathname.split("/")[2];
// Then, we grab all of our DOM elements
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("aboutMe");
const profilePrice = document.getElementById("profilePrice");
const profileChange = document.getElementById("profileChange");
const profileMarketCap = document.getElementById("marketCap");
const profileSharesOut = document.getElementById("sharesOutstanding");

const buyButton = document.getElementById("buyButton");
const sellButton = document.getElementById("sellButton");
const numSharesBuyElem = document.getElementById("sharesBuy");
const bidPriceElem = document.getElementById("bid-price");
const numSharesSellElem = document.getElementById("sharesSell");
const sellPriceElem = document.getElementById("sell-price");


import * as crud from '../crud.js';


// Similar to populateFeed() on the home page, we send a fetch() request to our Express API to grab the post with the specific ID in the url.
// We then display it's information on the page using our elements from the DOM
const populateStockProfile = async () => {
    const doc = {username: localStorage.getItem("BuySellName")};
    const buySellUser = await crud.readUser(doc);

    profileName.innerHTML = `${buySellUser.first_name} ${buySellUser.last_name}`;
    profileBio.innerHTML = buySellUser.bio;
    profilePrice.innerHTML = `${buySellUser.market_value} Bittels`;
    profileChange.innerHTML = "0%";
    profileMarketCap.innerHTML = `${buySellUser.market_value*buySellUser.total_shares} Bittels`;
    profileSharesOut.innerHTML = `${buySellUser.total_shares_owned}`;
};

populateStockProfile();

buyButton.addEventListener("click", async () => {
    const numSharesBuy = numSharesBuyElem.value;
    const bidPrice = bidPriceElem.value;
    console.log(numSharesBuy, bidPrice);
    if (validateInput(bidPrice, numSharesBuy)) {
        const response = await crud.buy(localStorage.getItem("currentUser"), localStorage.getItem("BuySellName"),  Number(bidPrice), Number(numSharesBuy));
        alert(response.message);
        if (response.status === "OK") {
            window.location.href = "http://localhost:5000/page/buySell";
        } 
    } else {
        alert("invalid buy input");
    }
    
});

sellButton.addEventListener("click", async () => {
    const numSharesSell = numSharesSellElem.value;
    const sellPrice = sellPriceElem.value;

    if (validateInput(numSharesSell, sellPrice)) {
        const response = await crud.sell(localStorage.getItem("currentUser"), localStorage.getItem("BuySellName"), Number(sellPrice), Number(numSharesSell));
        alert(response.message);
        if (response.status === "OK") {
            window.location.href = "http://localhost:5000/page/buySell";
        }
    } else {
        alert("invalid sell input");
    }
    
});

const validateInput = (shares, price) => {
    return  [shares, price].every(x=> x.match(/^[0-9]+$/) != null && Number(x) > 0);
};
