import * as crud from '../crud.js';

const profile = document.getElementById('profile');
const table = document.getElementById('table');

profile.addEventListener('click', () => {
    window.location.href = "../Profile/userProfile.html";
});

const populatePopularProfiles = async () => {
    const lst = await crud.readAllUser();
    //Loop through all users in the object
    for (let i = 0; i < 5; i++) {
        let id = lst.rows[i].doc._id;
        table.innerHTML += 
        `<tr class="main-row" id="${id}">
            <td>
                <img id="profile-pic" src="../../../assets/istockphoto-1130884625-612x612.jpeg" />
            </td>
            <td>
                <text class="text-1">${lst.rows[i].doc.username}</text>
            </td>
            <td>
                <text class="text-1">${lst.rows[i].doc.bittels}</text>
            </td>
        </tr>`
    }
    for (let i = 0; i < 5; i++) {
        let id = lst.rows[i].doc._id;
        let row = document.getElementById(id);
        row.addEventListener('click', (e) => {
            console.log("here");
            localStorage.setItem("BuySellId", id);
            window.location.href = "../BuySell/buySellPage.html";
        });
    }
}

populatePopularProfiles();
