import * as crud from './crud.js';

const portTable = document.getElementById('portTable');
const addButton = document.getElementById('crudAddStock');
const removeButton = document.getElementById('crudRemoveStock');



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
        </tr>`
      }
    }
  };



addButton.addEventListener('click', async (e) => {
    // refactor displaying to be a 'populate' or 'render', and adding/removing only adds to the database

    id = 0; // will need to get this from somewhere
    await crud.addStockToPortfolio(id);
    generatePortfolio();
});

removeButton.addEventListener('click', async (e) => {
    id = 0; // will need to get this from somewhere
    await crud.removeStockFromPortfolio(id);
    generatePortfolio()
});



generatePortfolio();



