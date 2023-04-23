import * as crud from '../crud.js';

//const portTable = document.getElementById('portTable');
//const addButton = document.getElementById('crudAddStock');
//const removeButton = document.getElementById('crudRemoveStock');
const redirectButton = document.getElementById('invego');

/*
const generatePortfolio = async () => {
    const ownedStocks = await crud.readAllStocksInPortfolio();
  
    portTable.innerHTML = "";
  
    if (posts.length > 0) {
      for (const stock of ownedStocks) {
        portTable.innerHTML +=  `
        <tr>
            <td><img class="profile-pic" src="${stock.profilePicLink}" /></td>
            <td>${stock.name}</td>
            <td>${stock.bittle}</td>
            <td>${stock.bittleChange}B</td>
            <td>Shares: ${stock.number}</td>
        </tr>`
      }
    }
  };



addButton.addEventListener('click', async (e) => {
    // in the future this would more likely call the matching algorithm, for 'buy' 

    id = 0; // will need to get this from somewhere
    await crud.addStockToPortfolio(id);
    generatePortfolio();
});

removeButton.addEventListener('click', async (e) => {
    id = 0; // will need to get this from somewhere
    await crud.removeStockFromPortfolio(id);
    generatePortfolio()
});*/

redirectButton.addEventListener("click", async () => {
  window.location.href = "../Discovery/discovery.html";
});

//generatePortfolio();



