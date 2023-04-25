const { readFile, writeFile, access } = require('fs').promises;
// import { readFile, writeFile, access } from 'fs/promises';
// import { constants, write } from 'fs';

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
    _id: id,
    market_value: val,
    total_shares: numShares,
    percent_growth: percentGrowth,
  };
  
  const existingArray = await reload(stockJSONfile);
  existingArray.push(obj);
  await save(stockJSONfile, existingArray);

  return obj;
}

async function createPortfolio(id, stocks){
    obj ={
        _id: id,
        stocks: stocks,
    }
    const existingArray = await reload(portfolioJSONfile);
    existingArray.push(obj);
    await save(portfolioJSONfile, existingArray);
  
    return obj;
}

async function createStocks(){
    for(let i = 0; i<100; i++){
        let id = i+1; 
        let val = getRandomNumber(99, 9999);
        let numShares = getRandomNumber(99, 9999);
        let percentGrowth = getRandomNumber(0, 99)/100;
        await createStock(id, val, numShares, percentGrowth)
    }
}

async function createPortfolios(){

    for(let i = 0; i<100; i++){
        let id = getRandomNumber(0, 100);
        let stocks = []
        if(id%2 == 1){ 
            stocks.push({[id]: getRandomNumber(1, 50)})
        }else{
            prev = []
            for(let i = 0; i<5; i++){ 
                id = getRandomNumber(0, 100);
                if(prev.includes(id)){
                    continue; 
                }
                stocks.push({[id]: getRandomNumber(1, 6)});
                prev.push(id);
            }
        }
        await createPortfolio(i+1, stocks)
    }

}



const stockJSONfile = 'STOCK_MOCK_DATA.json';
const portfolioJSONfile = 'PORTFOLIO_MOCK_DATA.json';
console.log("shit8")
createStocks();
// createPortfolios();

