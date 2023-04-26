// import PouchDB from "../../node_modules/pouchdb/dist/pouchdb.min.js";
// import * as PouchDB from '../../node_modules/pouchdb/dist/pouchdb.js';

let db1 = new PouchDB("users");
let db2 = new PouchDB("portfolios");

// put in mock data

function saveId(id) {
  localStorage.setItem('currentId', id);
}

function getCurrentId() {
  return localStorage.getItem('currentId');
}

export async function createUser(username, password) {
  const user = {
    username: username,
    password: password,
    firstName: "",
    lastName: "",
  }
  try {
    await db1.post(user).then((response)=> {
      console.log(response); 
      saveId(response.id);
    });
    console.log("user created");
  } catch (err) {
    console.log("failed to create user. "+err);
  }
}

export async function updateUser(username, bio) {
  //Find the user
  const user = await db1.get(getCurrentId("currentId"));
  user.bio = bio;
  user.username = username;
  try {
    await db1.put(user);
    console.log("User updated");
  } catch (err) {
    console.log("Failed to update user. "+err);
  }
}

//Read user 
export async function login(username, password) {
  console.log("log in");
  let user = null;
  try {
    await db1.createIndex({
      index: {
        fields: ['username', 'password']
      }
    }).then(async () => {
      user = await db1.find({
        selector: {
          username: username,
          password: password
        }
      });
    });
    user = user? user.docs[0] : null;
    console.log(user._id);
    if (user) {
      saveId(user._id);
    }
    return user;
  } catch (err) {
    console.log("failed to read user. "+err);
  }
}

export async function readAllUser() {
  try {
    const allUser = await db1.allDocs({ include_docs: true });
    return allUser;
  } catch (err) {
    console.log("failed to read all user. "+err);
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
    bittels: 0,
    market_value: 0,
    total_shares: 0,
    percent_growth: 0,
  };

  return doc;
}

export async function stockExists(id) {
  console.log("does", id, "exist");
  try {
    const stock = await readStock(id);
    console.log("stock does exist", id);
    return true;
  } catch (err) {
    console.log("stock does not exist", id);
    return false;
  }
}

export async function createStock(id) {

    const doc = getSampleStockObject();

    try {
        await db1.put(doc);
        console.log('Data created successfully');
      } catch (err) {
        console.log('Error in createStock:', err);
      }
      
  }
  
  export async function readStock(id) {

    try {
        const doc = await db1.get(id);
        return doc;
      } catch (err) {
        console.log('Error in readStock:', err);
      }

  }
  
  export async function updateStock(id, newValue) {
    // use getSampleStockObject() to get a sample stock object to pass into newValue

    try {
        const doc = await db1.get(id);
        await db1.put(newValue);
        console.log('Data updated successfully');
      } catch (err) {
        console.log('Error in updateStock:', err);
      }

  }
  
  export async function deleteStock(id) {

    try {
        const doc = await db1.get(docId);
        await db1.remove(doc);
        console.log('Data deleted successfully');
      } catch (err) {
        console.log('Error in deleteStock:', err);
      }

  }
  
  export async function readPortfolio() {
    try {
        const id = getCurrentId("currentId");
        console.log("finding portfolio for id:", id);
        const docs = await db2.get(id);
        console.log("found portfolio:", docs);
        return docs;
      } catch (err) {
        console.log('Error in readPortfolio:', err);
      }

  }

  export async function createPortfolio(userId) {
    try {
        const id = await getCurrentId("currentId");
        console.log("createPortfolio id:", id);
        const doc = {
            _id: id,
            stocks: {
              /*
              _id: {
                num_shares: 0,
                purchase_price: 0,
              }
              */
            },
        };

        await db2.put(doc);
        console.log("Portfolio created successfully");
      } catch (err) {
        console.log('Error in createPortfolio:', err);
      }

  }

  export async function test_getAllPorfolios() {
    try {
        const docs = await db2.allDocs();
        console.log("Portfolio created successfully");
        return docs;
      } catch (err) {
        console.log('Error retrieving data:', err);
      }

  }
  
// within portfolio

export async function buyStockInPortfolio(stockId, num_shares) {
      // if the user does not have the stock, then 'add'

      // if the user does have the stock, then 'update'

      try {
        const portfolio = await readPortfolio();

        if (stockId in portfolio.stocks) {
          portfolio.stocks[stockId].num_shares += num_shares;

          db2.put(portfolio);
        } else {
          await addStockToPortfolio(stockId, num_shares);
        }


      } catch (err) {
        console.log('Error in buyStockInPortfolio:', err);
      }

  }

  //export async function 

export async function sellStockInPortfolio(stockId, num_shares) {

      try {
        const portfolio = await readPortfolio();

        if (stockId in portfolio.stocks) {
          portfolio.stocks[stockId].num_shares -= num_shares;
          if (portfolio.stocks[stockId].num_shares === 0) {
            delete portfolio.stocks[stockId];
          }
          db2.put(portfolio);
        } else {
          console.log('Error buying stocks:', err);
        }

      } catch (err) {
        console.log('Error in sellStockInPortfolio:', err);
      }

  }

  export async function addStockToPortfolio(stockId, num_shares) {
    try {
      //const purchase_price = await readStock(stockId).market_value;

      const doc = await readStock(stockId);
      console.log("addStockToPortfolio doc", doc);
      const purchase_price = doc.market_value;

      const id = await getCurrentId("currentId");
      const portfolio = await db2.get(id);

      portfolio.stocks[stockId] = {
        "num_shares": num_shares, 
        "purchase_price": purchase_price,
      };

      await db2.put(portfolio);
      console.log('Data updated successfully');


    } catch (err) {
      console.log('Error in addStockToPortfolio:', err);
    }
  }
  
  export async function removeStockFromPortfolio(stockId) {
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
        console.log('Error in removeStockFromPortfolio:', err);
      }
  }