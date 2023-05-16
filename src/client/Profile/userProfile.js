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
              <td><img class="profile-pic" src="../../../assets/istockphoto-1130884625-612x612.jpeg" ></td>
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
      window.location.href = "http://localhost:5000/page/buySell";
    })
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
  window.location.href = "http://localhost:5000/page/discovery";
});

generatePortfolio();
