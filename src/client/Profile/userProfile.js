import * as crud from '../crud.js';

const portTable = document.getElementById('portTable');
const addButton = document.getElementById('crudAddStock');
const removeButton = document.getElementById('crudRemoveStock');
const redirectButton = document.getElementById('invego');
const inputId = document.getElementById('inputId');
const saveButton = document.getElementById('save');

console.log("userProfile.js loaded");

const generatePortfolio = async () => {
  //console.log("generatePortfolio");

  //const allPortfolios = await crud.test_getAllPorfolios();
  //console.log("allPortfolios", allPortfolios);

  
  const portfolio = await crud.readPortfolio();
  console.log("portfolio", portfolio);

  const ownedStocks = portfolio.stocks;
  //console.log("stocks (within portfolio)", ownedStocks);

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
      const value = ownedStocks[key];

      /*
      if (Object.values(ownedStocks).length === 0 || value[key] === undefined) {
        console.log("You own no stocks.");
        break;
      }*/
      
      //console.log("key", key);
      //console.log("value", value);

      try {
        const stock = await crud.readStock(key);

        //console.log("stock", stock);
        const name = stock.first_name + ' ' + stock.last_name;
        const market_value = stock.market_value;
        const num_shares = value.num_shares;
        const purchase_price = value.purchase_price;
        const roi = (market_value/purchase_price).toFixed(3);


        portTable.innerHTML +=  `
          <tr>
              <td><img class="profile-pic" src="${stock.profilePicLink}" ></td>
              <td>${name}</td>
              <td>${market_value}</td>
              <td>${roi}%</td>
              <td>${num_shares}</td>
          </tr>`
      } catch (err) {
        console.log('Error retrieving data:', err);
      }   
  }
}

saveButton.addEventListener('click', async (e) => {
  const name = document.getElementById('input-name').value;
  const bio = document.getElementById('input-bio').value;
  if (name || bio) {
    await crud.updateUser(name, bio);
  }
});

addButton.addEventListener('click', async (e) => {
    // in the future this would more likely call the matching algorithm, for 'buy' 

    console.log("buy -- ");

    let stockId = inputId.value;
    if (stockId == null) {
      alert("Please enter a valid stock ID");
    } else {
      try {
        // if stock exists

        if (crud.stockExists(stockId)) {
          await crud.buyStockInPortfolio(stockId, 1);
        } else {
          console.log("Stock does not exist");
          alert("Stock does not exist");
        }
      } catch (err) {
        console.log('Error retrieving data:', err);
      }
    }
    generatePortfolio();
});

removeButton.addEventListener('click', async (e) => {
    
  console.log("sell -- ");

  let stockId = inputId.value;
  if (stockId == null) {
    alert("Please enter a valid stock ID");
  } else {
    try {
      // if stock exists

      if (crud.stockExists(stockId)) {
        await crud.sellStockInPortfolio(stockId, 1);
      } else {
        console.log("Stock does not exist");
        alert("Stock does not exist");
      }
    } catch (err) {
      console.log('Error retrieving data:', err);
    }
  }
  generatePortfolio();
});

redirectButton.addEventListener("click", async () => {
  window.location.href = "../Discovery/discovery.html";
});

generatePortfolio();




