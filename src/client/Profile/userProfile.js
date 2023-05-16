import * as crud from '../crud.js';

const portTable = document.getElementById('portTable');
const addButton = document.getElementById('crudAddStock');
const removeButton = document.getElementById('crudRemoveStock');
const redirectButton = document.getElementById('invego');
const inputId = document.getElementById('inputId');
const firstnameCell = document.getElementById('first-name-cell');
const lastnameCell = document.getElementById('last-name-cell');
const usernameCell = document.getElementById('username-cell');
const bioCell = document.getElementById('bio-cell');
const profileButton = document.getElementById('profile-button');

console.log("userProfile.js loaded");

const generatePortfolio = async () => {
  //console.log("generatePortfolio");

  //const allPortfolios = await crud.test_getAllPorfolios();
  //console.log("allPortfolios", allPortfolios);

  
  const portfolio = await crud.readPortfolio(localStorage.getItem("currentUser"));
  console.log("portfolio", portfolio);

  const ownedStocks = portfolio.stocks;
  // console.log("stocks (within portfolio)", ownedStocks);

  portTable.innerHTML = `
    <tr>
      <th>Picture</th>
      <th>Name</th>
      <th>Market Value</th>
      <th>ROI</th>
      <th>Shares</th>
    </tr>`;

  // key is the id of a stock in the porfolio, 
  // value is the contents of the portfolio  { has nothing inside of it }
  //for (const [key, value] of Object.entries(ownedStocks)) {

  for (const key of Object.keys(ownedStocks)) {
      const stock = ownedStocks[key];

      /*
      if (Object.values(ownedStocks).length === 0 || value[key] === undefined) {
        console.log("You own no stocks.");
        break;
      }*/
      
      //console.log("key", key);
      //console.log("value", value);

      try {
        const stockUser = await crud.readUser({username: key});
        //console.log("stock", stock);
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
      window.location.href = "../BuySell/buySellPage.html";
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

// addButton.addEventListener('click', async (e) => {
//     // in the future this would more likely call the matching algorithm, for 'buy' 

//     console.log("buy -- ");

//     let stockId = inputId.value;
//     if (stockId == null) {
//       alert("Please enter a valid stock ID");
//     } else {
//       try {
//         // if stock exists

//         if (crud.stockExists(stockId)) {
//           await crud.buyStockInPortfolio(stockId, 1);
//         } else {
//           console.log("Stock does not exist");
//           alert("Stock does not exist");
//         }
//       } catch (err) {
//         console.log('Error retrieving data:', err);
//       }
//     }
//     generatePortfolio();
// });

// removeButton.addEventListener('click', async (e) => {
    
//   console.log("sell -- ");

//   let stockId = inputId.value;
//   if (stockId == null) {
//     alert("Please enter a valid stock ID");
//   } else {
//     try {
//       // if stock exists

//       if (crud.stockExists(stockId)) {
//         await crud.sellStockInPortfolio(stockId, 1);
//       } else {
//         console.log("Stock does not exist");
//         alert("Stock does not exist");
//       }
//     } catch (err) {
//       console.log('Error retrieving data:', err);
//     }
//   }
//   generatePortfolio();
// });

redirectButton.addEventListener("click", async () => {
  window.location.href = "../Discovery/discovery.html";
});

generatePortfolio();
await showProfile();