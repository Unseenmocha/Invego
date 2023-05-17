import * as crud from '../crud.js';


const table = document.getElementById('popular-table');
const messageView = document.getElementById('messages-container-view');
const friendsView = document.getElementById('friends-bar');
const searchBar = document.getElementById('search-bar');
const searchTable = document.getElementById('search-table');


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

const userList = {users:[], waiting: false};

searchBar.addEventListener("focus", async () => {
    searchTable.style.visibility = 'visible';
    userList.waiting = true;
    userList.users = await crud.readAllUsers();
    userList.waiting = false;
});

searchBar.addEventListener("input", (e) => {
    const term = e.target.value;
    if (term === '') {
        searchTable.innerHTML = "";
        return;
    }

    while (userList.waiting) {
        continue;
    }
    const displayList = userList.users.filter((user) => user.username.startsWith(term));
    if (displayList.length === 0) {
        searchTable.innerHTML = "";
        return;
    }
    
    searchTable.innerHTML = `
    <tr>
        <td></td>
        <td>
            <h5>Username</h5>
        </td>
        <td>
            <h5>Market Value</h5>
        </td>
    </tr>`;
    displayList.forEach((user)=>{
        searchTable.innerHTML += `
        <tr id="${user.username}-search">
            <td><img class="circle-pic pic-outline" src="../../../assets/default-profile.jpg" /></td>
            <td>${user.username}</td>
            <td>${user.market_value}</td>
        </tr>
        `
    });
    displayList.forEach((user)=> {
        let row = document.getElementById(`${user.username}-search`);
        row.addEventListener('click', (e) => {
            localStorage.setItem("BuySellName", user.username);
            window.location.href = "/page/buySell";
        }) 
    });
});

searchBar.addEventListener("blur", () => {
    setTimeout(() => {
        searchTable.style.visibility = 'hidden';
    }, 150);
});

populatePopularProfiles();

messageView.addEventListener('click', () => {
    alert('Messaging functionality has not been implemented for the scope of this project.');
});

friendsView.addEventListener('click', () => {
    alert('Friends functionality has not been implemented for the scope of this project.');
});
