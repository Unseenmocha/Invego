// Because of how we set up our Express server, we are able to visit this page by adding "/post/:postId" to our url in the browser.
// Because of this, we can grab the ID from the URL and use it to perform operations:
const postId = window.location.pathname.split("/")[2];
// Then, we grab all of our DOM elements
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");
const profilePrice = document.getElementById("profilePrice");
const profileChange = document.getElementById("profileChange");
const profileShares = document.getElementById("profileShares");
const buyButton = document.getElementById("buyButton");
const sellButton = document.getElementById("sellButton");

// Similar to populateFeed() on the home page, we send a fetch() request to our Express API to grab the post with the specific ID in the url.
// We then display it's information on the page using our elements from the DOM
const populateStockProfile = async () => {
    // here profiles and stocks used interchangeably
    const profileRes = await fetch(`/stocks/${stockId}`);
    const profile = await profileRes.json();

    profileName.innerHTML = profile.name;
    profileBio.innerHTML = profile.bio;
    profilePrice.innerHTML = profile.price;
    profileChange.innerHTML = profile.change;
    profileShares.innerHTML = profile.shares;
};

populatePostPage();

const buy = async () => {

}

const sell = async () => {
    
}

buyButton.addEventListener("click", async () => {
    // buys stock, adds it?
    await buy();
});

sellButton.addEventListener("click", async () => {
    // do we need to do anything in order to handle users, this being only visible to the owning user?
    // okay this is all done by middleware in the server and app.use under express
    await sell();
});

