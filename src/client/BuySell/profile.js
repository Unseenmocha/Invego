// Because of how we set up our Express server, we are able to visit this page by adding "/post/:postId" to our url in the browser.
// Because of this, we can grab the ID from the URL and use it to perform operations:
const postId = window.location.pathname.split("/")[2];
// Then, we grab all of our DOM elements
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");
const profilePrice = document.getElementById("profilePrice");
const profileChange = document.getElementById("profileChange");
const buyButton = document.getElementById("buyButton");
const sellButton = document.getElementById("sellButton");
const redirectButton = document.getElementById('invego');

import * as crud from '../crud.js';

// Similar to populateFeed() on the home page, we send a fetch() request to our Express API to grab the post with the specific ID in the url.
// We then display it's information on the page using our elements from the DOM
const populateStockProfile = async () => {
    const doc = {username: localStorage.getItem("BuySellName")};
    const buySellUser = await crud.readUser(doc);

    profileName.innerHTML = `${buySellUser.first_name} ${buySellUser.last_name}`;
    profileBio.innerHTML = buySellUser.bio;
    profilePrice.innerHTML = buySellUser.market_value;
    profileChange.innerHTML = "0%";
};

populateStockProfile();

const buy = async () => {

}

const sell = async () => {
    
}

// buyButton.addEventListener("click", async () => {
//     // buys stock, adds it?
//     await buy();
// });

// sellButton.addEventListener("click", async () => {
//     // do we need to do anything in order to handle users, this being only visible to the owning user?
//     // okay this is all done by middleware in the server and app.use under express
//     await sell();
// });



//Grab info from database
// let bittels = crud.dosomething with bittles
// let about = crud.dosomething with about
// let profileName = crud.dosomething with profileName

// document.getElementById("Bittels").textContent = getInfo.getHowMuch() + " B";
// document.getElementById("percentBittel").textContent = getInfo.getPercentBittel();
// document.getElementById("aboutMe").textContent = getInfo.getAboutMe(); 
// document.getElementById("profileName").textContent = getInfo.getProfileName(); 


redirectButton.addEventListener("click", async () => {
    window.location.href = "../Discovery/discovery.html";
  });