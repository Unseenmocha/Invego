import * as crud from '../crud.js';

const profile = document.getElementById('profile');
const table = document.getElementById('table');

profile.addEventListener('click', () => {
    window.location.href = "../Profile/userProfile.html";
});

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
            window.location.href = "../BuySell/buySellPage.html";
        });
    }
}

populatePopularProfiles();
