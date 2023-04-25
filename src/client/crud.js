// import PouchDB from "../../node_modules/pouchdb/dist/pouchdb.min.js";
// import * as PouchDB from '../../node_modules/pouchdb/dist/pouchdb.js';

let db1 = new PouchDB("stocks");
let db2 = new PouchDB("portfolios");

export async function createUser(username, password) {
  const user = {
    _id: "0",
    username: username,
    password: password,
    firstName: "",
    lastName: "",
  }
  try {
    await db1.post(user);
    console.log("user created");
  } catch (err) {
    console.log("failed to create user. "+err);
  }
}

export async function readUser(username, password) {
  try {
    const doc = await db1.get(username);
    return doc;
  } catch (err) {
    console.log("failed to read user. "+err);
  }
}

export function getSampleStockObject() {
  // if we ever change the data schema, we change it here

  const doc = {
    _id: 0,
    _bio: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    bittle: 0,
    market_price: 0,
    total_shares: 0,
    percent_growth: 0,
  };

  return doc;
}

export async function createStock(id) {

    const doc = getSampleStockObject();

    try {
        await db1.put(doc);
        console.log('Data created successfully');
      } catch (err) {
        console.log('Error creating data:', err);
      }
      
  }
  
  export async function readStock(id) {

    try {
        const doc = await db1.get(id);
        return doc;
      } catch (err) {
        console.log('Error retrieving data:', err);
      }

  }
  
  export async function updateStock(id, newValue) {
    // use getSampleStockObject() to get a sample stock object to pass into newValue

    try {
        const doc = await db1.get(id);
        await db1.put(newValue);
        console.log('Data updated successfully');
      } catch (err) {
        console.log('Error updating data:', err);
      }

  }
  
  export async function deleteStock(id) {

    try {
        const doc = await db1.get(docId);
        await db1.remove(doc);
        console.log('Data deleted successfully');
      } catch (err) {
        console.log('Error deleting data:', err);
      }

  }
  
  export async function getPortfolio(userId) {
    try {
        const docs = await db2.get(userId);
        return docs;
      } catch (err) {
        console.log('Error retrieving data:', err);
      }

  }

  export async function createPortfolio(userId) {
    try {
        const doc = {
            _id: 0,
        };

        await db2.put(doc);
        console.log("Portfolio created successfully");
      } catch (err) {
        console.log('Error retrieving data:', err);
      }

  }
  
// within portfolio

export async function buyStockInPortfolio(userId, stockId) {

    try {
        const doc = await db2.get(id);

        if (stockId in doc.portfolio) {
            ++doc.portfolio[stockId];
        } else {
            doc.portfolio[stockId] = 1;
        }

        await db2.put(doc);
        console.log('Data updated successfully');
      } catch (err) {
        console.log('Error updating data:', err);
      }

  }

export async function sellStockInPortfolio(id) {

    try {
        const doc = await db2.get(id);

        if (stockId in doc.portfolio) {
            --doc.portfolio[stockId];
            if (doc.portfolio[stockId] === 0) {
                delete doc.portfolio[stockId];
            }
        } else {
            console.log('Error updating data:', err);
        }

        await db2.put(doc);
        console.log('Data updated successfully');
      } catch (err) {
        console.log('Error updating data:', err);
      }

  }

  
  export async function removeStockFromPortfolio(id) {
    try {
        const doc = await db2.get(id);

        if (stockId in doc.portfolio) {
            delete doc.portfolio[stockId];
        } else {
            console.log('Error updating data:', err);
        }

        await db2.put(doc);
        console.log('Data updated successfully');
      } catch (err) {
        console.log('Error updating data:', err);
      }
  }