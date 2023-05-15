const fs = require('fs');
const { readFile, writeFile, access } = require('fs').promises;
// import { readFile, writeFile, access } from 'fs/promises';
// import { constants, write } from 'fs';
const { firstNames, lastNames, passwords, bios } = require('./mockDataArrays.js');

// import { firstNames, lastNames, passwords, bios } from './mockDataArrays.js';


const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


async function reload(filename) {
  try {
    await access(filename); // check if file exists
    const data = await readFile(filename, 'utf8');
    if (data.trim() === '') {
      return []; // handle empty file
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading from file: ', err);
    return [];
  }
}

async function save(filename, arr) {
  try {
    await writeFile(filename, JSON.stringify(arr), 'utf8');
  } catch (err) {
    console.error('Error writing to file: ', err);
  }
}


async function createStock(id, val, numShares, percentGrowth) {
  const obj = {
    // _id: id,
    market_value: val,
    total_shares: numShares,
    percent_growth: percentGrowth,
  };
  
  const existingArray = await reload(stockJSONfile);
  existingArray.push(obj);
  await save(stockJSONfile, existingArray);

  return obj;
}
async function createStocks(){
  for(let i = 0; i<100; i++){
      let id = i+1; 
      let market_value = getRandomNumber(10, 200);
      let numShares = getRandomNumber(99, 9999);
      let percentGrowth = getRandomNumber(0, 99)/100;
      await createStock(id, market_value, numShares, percentGrowth)
  }
}

async function createPortfolio(id, stocks){
    obj ={
        _id: String(id),
        stocks: stocks,
    }
    const existingArray = await reload(portfolioJSONfile);
    existingArray.push(obj);
    await save(portfolioJSONfile, existingArray);
  
    return obj;
}

async function createUser(id, firstName, lastName, bio, username, password, marketValue, totalShares){
  obj ={
      _id: id,
      first_name: firstName,
      last_name: lastName,
      bio: bio, 
      username: username,
      password: password,
      bittels: getRandomNumber(100, 50000),
      market_value: marketValue,
      total_shares: totalShares,
      total_shares_owned: totalOwnedSharesDict[id],
  }
  const existingArray = await reload(userJSONfile);
  existingArray.push(obj);
  await save(userJSONfile, existingArray);

  return obj;
}

async function createUsers(){
  for(let i = 0; i<100; i++){
    let id = String(i + 1);
    let firstName = firstNames[i];
    let lastName = lastNames[i];
    let bio = bios[i];
    let username = firstName + "." + lastName;
    let password = passwords[i];
    let marketValue = getRandomNumber(10, 200);
    let sharesLowerBound = totalOwnedSharesDict[id] * 2;
    let totalShares = 0
    if (sharesLowerBound < 99){
      totalShares = getRandomNumber(99, 9999);
    }else{
      totalShares = getRandomNumber(sharesLowerBound, 9999);
    }
    await createUser(id, firstName, lastName, bio, username, password, marketValue, totalShares)
  }

}
async function createPortfolios(){

  for(let i = 0; i<100; i++){
      let id = String(i+1);
      let stocks = {};
      if(id%2 == 1){ 
          let numShares = getRandomNumber(1, 50);
          totalOwnedSharesDict[id] += numShares;
          stocks[id] = {num_shares: numShares, purchase_price: getRandomNumber(1, 200)};
      }else{
          prev = []
          for(let i = 0; i<5; i++){ 
              id = getRandomNumber(0, 100);
              if(prev.includes(id)){
                  continue; 
              }
              let numShares = getRandomNumber(1, 6); 
              totalOwnedSharesDict[id] += numShares;
              stocks[id] = {num_shares: numShares, purchase_price: getRandomNumber(1, 200)};
              prev.push(id);
          }
      }
      await createPortfolio(i+1, stocks)
  }
}







const stockJSONfile = 'STOCK_MOCK_DATA.json';
const portfolioJSONfile = 'PORTFOLIO_MOCK_DATA.json';
const userJSONfile = 'USER_MOCK_DATA.json';
let totalOwnedSharesDict = {};
for(let i = 1; i<=100; i++){ totalOwnedSharesDict[String(i)] = 0;}

async function main(){
  fs.writeFileSync(portfolioJSONfile, '');
  fs.writeFileSync(userJSONfile, '');

  await createPortfolios();
  await createUsers();
}

main();

