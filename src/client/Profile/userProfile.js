import * as crud from '../crud.js';

const portTable = document.getElementById('portTable');
const firstnameCell = document.getElementById('first-name-cell');
const lastnameCell = document.getElementById('last-name-cell');
const usernameCell = document.getElementById('username-cell');
const bioCell = document.getElementById('bio-cell');
const profileButton = document.getElementById('profile-button');
const deleteButton = document.getElementById('delete-button');
const bittel = document.getElementById('bittel');

console.log("userProfile.js loaded");

const generatePortfolio = async () => {  
  const portfolio = await crud.readPortfolio(localStorage.getItem("currentUser"));
  console.log("portfolio", portfolio);

  const ownedStocks = portfolio.stocks;

  portTable.innerHTML = `
    <tr>
      <th>Picture</th>
      <th>Name</th>
      <th>Market Value</th>
      <th>ROI</th>
      <th>Shares</th>
    </tr>`;


  for (const key of Object.keys(ownedStocks)) {
      const stock = ownedStocks[key];

      try {
        const stockUser = await crud.readUser({username: key});
        const name = stockUser.first_name + ' ' + stockUser.last_name;
        const market_value = stockUser.market_value;
        const num_shares = stock.num_shares;
        const purchase_price = stock.purchase_price;
        const roi = (market_value/purchase_price).toFixed(3);


        portTable.innerHTML +=  `
          <tr id="${key}">
              <td><img class="circle-pic pic-outline" src="../../../assets/default-profile.jpg" ></td>
              <td><p>${name}<p></td>
              <td><p>${market_value}<p></td>
              <td><p>${roi}%<p></td>
              <td><p>${num_shares}<p></td>
          </tr>`
        
      } catch (err) {
        console.log('Error retrieving data:', err);
      }
  }
  for (const key of Object.keys(ownedStocks)) {
    let row = document.getElementById(key);
    row.addEventListener('click', async (e) => {
      localStorage.setItem("BuySellName", key);
      window.location.href = "/page/buySell";
    })
  }
}

const showProfile = async () => {
  const user = await crud.readUser({username: localStorage.getItem("currentUser")});

  const firstname = document.createElement('p');
  firstname.id = 'firstname-p';
  firstname.textContent = user.first_name;
  firstnameCell.replaceChild(firstname,firstnameCell.firstChild);

  const lastname = document.createElement('p');
  lastname.id = 'lastname-p';
  lastname.textContent = user.last_name;
  lastnameCell.replaceChild(lastname, lastnameCell.firstChild);

  const username = document.createElement('p');
  username.id = 'username-p';
  username.textContent = user.username;
  usernameCell.replaceChild(username, usernameCell.firstChild);

  const bio = document.createElement('p');
  bio.id = 'bio-p';
  bio.textContent = user.bio;
  bioCell.replaceChild(bio, bioCell.firstChild);

  profileButton.textContent = "Edit";
  deleteButton.style.visibility = "hidden";
}

const showProfileEdit = () => {
  const firstNameInput = document.createElement('input');
  const lastNameInput = document.createElement('input');
  const usernameInput = document.createElement('input');
  const bioInput = document.createElement('textarea');

  firstNameInput.id = 'input-first-name';
  lastNameInput.id = 'input-last-name';
  usernameInput.id = 'input-username';
  bioInput.id = 'input-bio';

  firstNameInput.placeholder = "Firstname";
  lastNameInput.placeholder = "Lastname";
  usernameInput.placeholder = "Username"
  bioInput.placeholder = "Add a bio.";

  [firstNameInput, lastNameInput, usernameInput].forEach((e)=> {e.classList.add('text-entry-gray')});

  firstNameInput.value = document.getElementById("firstname-p").textContent;
  lastNameInput.value = document.getElementById("lastname-p").textContent;
  usernameInput.value = document.getElementById("username-p").textContent;
  bioInput.value = document.getElementById("bio-p").textContent;

  firstnameCell.replaceChild(firstNameInput, firstnameCell.firstChild);
  lastnameCell.replaceChild(lastNameInput, lastnameCell.firstChild);
  usernameCell.replaceChild(usernameInput, usernameCell.firstChild);
  bioCell.replaceChild(bioInput, bioCell.firstChild);
  profileButton.textContent = "Save";
  deleteButton.style.visibility = "visible";
}

profileButton.addEventListener('click', async (e) => {
  const firstNameInput = document.getElementById('input-first-name');
  const lastNameInput = document.getElementById('input-last-name');
  const usernameInput = document.getElementById('input-username');
  const bioInput = document.getElementById('input-bio');

  const mode = e.target.textContent;

  if (mode === "Save") {
    const changes = {
      first_name: firstNameInput.value,
      last_name: lastNameInput.value,
      username: usernameInput.value,
      bio: bioInput.value,
    };
    const response = await crud.updateUser({username:localStorage.getItem("currentUser")}, changes);
    if (response.message !== undefined) {
      alert(response.message);
    } else {
      await showProfile();
    }
  }
  else if (mode === "Edit") {
    showProfileEdit();
  }
});

deleteButton.addEventListener('click', async (e) => {
  if (confirm("Are you sure you wish to delete your account?")) {
    await crud.deleteUser({username: localStorage.getItem("currentUser")});
    window.location.href = "/page/login";
  }
})

const populateBittels = async () => {
  const user = await crud.readUser({ username: localStorage.getItem("currentUser") });
  const balance = user.bittels;
  bittel.innerHTML = `<h3 class="white-text">Bittels: ${balance}</h3>`;
}

populateBittels();
generatePortfolio();
await showProfile();