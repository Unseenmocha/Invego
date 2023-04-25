// import PouchDB from "../../node_modules/pouchdb/dist/pouchdb.min.js";
// import * as PouchDB from '../../node_modules/pouchdb/dist/pouchdb.js';

let db1 = new PouchDB("stocks");
let db2 = new PouchDB("portfolios");

// put in mock data


function setCookie(name, value) { 
  let expires = new Date();
  expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 7));
  document.cookie = name + "=" + value + ";path=/;expires=" + expires.toUTCString();
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1,c.length);
    }
    
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length,c.length);
    }
  }
  return null;
}

export async function createUser(username, password) {
  const user = {
    username: username,
    password: password,
    firstName: "",
    lastName: "",
  }
  try {
    await db1.post(user).get((response)=> {
      setCookie("currentId", response.id);
    });
    console.log("user created");
  } catch (err) {
    console.log("failed to create user. "+err);
  }

  await createPortfolio(id);
}

export async function login(username, password) {
  console.log("log in");
  let user = null;
  try {
    await db1.createIndex({
      index: {
        fields: ['username', 'password']
      }
    }).then(function () {
      user = db1.find({
        selector: {
          username: username,
          password: password
        }
      });
      //console.log("user", user);
    });
    if (user) {
      setCookie("currentId", user.id);
    }
    return user;
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
  
  export async function getPortfolio() {
    try {
        const id = getCookie("currentId");
        console.log("finding portfolio for id:", id);
        const docs = await db2.get(id);
        console.log("found portfolio:", docs);
        return docs;
      } catch (err) {
        console.log('Error retrieving data:', err);
      }

  }

  export async function createPortfolio(userId) {
    try {
        const id = await getCookie("currentId");
        console.log("createPortfolio id:", id);
        const doc = {
            _id: id,
            stocks: {},
        };

        await db2.put(doc);
        console.log("Portfolio created successfully");
      } catch (err) {
        console.log('Error retrieving data:', err);
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