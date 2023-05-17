import * as crud from '../crud.js';


const table = document.getElementById('popular-table');
const messageView = document.getElementById('messages-container-view');
const friendsView = document.getElementById('friends-bar');
const searchBar = document.getElementById('search-bar');


const populatePopularProfiles = async () => {
    const lst = await crud.readTopFive();
    //Loop through all users in the object
    for (let i = 0; i < 5; i++) {
        let username = lst[i].username;
        table.innerHTML += 
        `<tr class="main-row" id="${username}">
            <td>
                <img class="circle-pic pic-outline" src="../../../assets/default-profile.jpg" />
            </td>
            <td>
                <p>${lst[i].username}</p>
            </td>
            <td>
                <p>${lst[i].market_value}</p>
            </td>
        </tr>`
    }
    for (let i = 0; i < 5; i++) {
        let username = lst[i].username;
        let row = document.getElementById(username);
        row.addEventListener('click', (e) => {
            console.log("here");
            localStorage.setItem("BuySellName", username);
            window.location.href = "/page/buySell";
        });
    }
}

populatePopularProfiles();

messageView.addEventListener('click', () => {
    alert('Messaging functionality has not been implemented for the scope of this project.');
});

friendsView.addEventListener('click', () => {
    alert('Friends functionality has not been implemented for the scope of this project.');
});

searchBar.addEventListener('click', () => {
    alert('Searching for users has not yet been implemented');
});