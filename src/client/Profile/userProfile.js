import * as crud from '../crud.js';

const portTable = document.getElementById('portTable');
const addButton = document.getElementById('crudAddStock');
const removeButton = document.getElementById('crudRemoveStock');
const redirectButton = document.getElementById('invego');
const saveButton = document.getElementById('save');

console.log("userProfile.js loaded");

const generatePortfolio = async () => {
  console.log("generatePortfolio");

  const allPortfolios = await crud.test_getAllPorfolios();
  console.log("allPortfolios", allPortfolios);

  
  const portfolio = await crud.getPortfolio();
  console.log("portfolio", portfolio);

  const ownedStocks = await portfolio.stocks;
  console.log("ownedStocks", ownedStocks);


  portTable.innerHTML = "";

  
  for (const stock of ownedStocks.values()) {
      portTable.innerHTML +=  `
      <tr>
          <td><img class="profile-pic" src="${stock.profilePicLink}" /></td>
          <td>${stock.name}</td>
          <td>${stock.bittel}</td>
          <td>${stock.bittelChange}B</td>
          <td>Shares: ${stock.number}</td>
      </tr>`
  }
  };

saveButton.addEventListener('click', async (e) => {
  const name = document.getElementById('input-name').value;
  const bio = document.getElementById('input-bio').value;
  if (name || bio) {
    await crud.updateUser(name, bio);
  }
});

addButton.addEventListener('click', async (e) => {
    // in the future this would more likely call the matching algorithm, for 'buy' 

    id = 0; // will need to get this from somewhere
    await crud.addStockToPortfolio(id);
    generatePortfolio();
});

removeButton.addEventListener('click', async (e) => {
    
    await crud.removeStockFromPortfolio(id);
    generatePortfolio();
});

redirectButton.addEventListener("click", async () => {
  window.location.href = "../Discovery/discovery.html";
});

generatePortfolio();




