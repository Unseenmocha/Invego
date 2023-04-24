//import e from "express";
//import PouchDB from 'pouchdb';
import PouchDB from '../../node_modules/pouchdb/dist/pouchdb.js';

let db = new PouchDB("posts");

export async function createStock(id) {

    const doc = {
        _id: 'mydoc',
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
    };

    try {
        await db.put(doc);
        console.log('Data created successfully');
      } catch (err) {
        console.log('Error creating data:', err);
      }
      

    /*
    const response = await fetch(`/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    return data;
    */
  }
  
  export async function readStock(id) {

    try {
        const doc = await db.get(id);
        return doc;
      } catch (err) {
        console.log('Error retrieving data:', err);
      }

    /*
    try {
      const response = await fetch(`/read?id=${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
    */
  }
  
  export async function updateStock(id, newValue) {

    try {
        const doc = await db.get(id);
        await db.put(newValue);
        console.log('Data updated successfully');
      } catch (err) {
        console.log('Error updating data:', err);
      }

    /*
    try {
      const response = await fetch(`/update?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
    return null;
    */
  }
  
  export async function deleteStock(id) {

    try {
        const doc = await db.get(docId);
        await db.remove(doc);
        console.log('Data deleted successfully');
      } catch (err) {
        console.log('Error deleting data:', err);
      }

    /*
    try {
      const response = await fetch(`/delete?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      }
      );
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
    return null;
    */
  }
  
  export async function readAllStocks() {

    try {
        const docs = await db.allDocs();
        return docs;
      } catch (err) {
        console.log('Error retrieving data:', err);
      }

    /*
    const response = await fetch(`/dump`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
    */
  }
  
// within portfolio

export async function buyStockInPortfolio(userId, stockId) {

    try {
        const doc = await db.get(id);

        if (stockId in doc.portfolio) {
            ++doc.portfolio[stockId];
        } else {
            doc.portfolio[stockId] = 1;
        }

        await db.put(doc);
        console.log('Data updated successfully');
      } catch (err) {
        console.log('Error updating data:', err);
      }


    /*
    const response = await fetch(`/addToPortfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    return data;
    */
  }

export async function sellStockInPortfolio(id) {

    try {
        const doc = await db.get(id);

        if (stockId in doc.portfolio) {
            --doc.portfolio[stockId];
            if (doc.portfolio[stockId] === 0) {
                delete doc.portfolio[stockId];
            }
        } else {
            console.log('Error updating data:', err);
        }

        await db.put(doc);
        console.log('Data updated successfully');
      } catch (err) {
        console.log('Error updating data:', err);
      }

    /*
    const response = await fetch(`/addToPortfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data;
    */
  }
  
  export async function readSingleStockInPortfolio(userId, stockId) {

    try {
        const doc = await db.get(id);
        
        if (stockId in doc.portfolio) {
            return doc.portfolio[stockId];
        } else {
            console.log('Error retrieving data:', "not found");
        }
        
      } catch (err) {
        console.log('Error retrieving data:', err);
      }

    /*
    try {
      const response = await fetch(`/readSingleStockInPortfolio`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
    */
  }

  export async function readStocksInPortfolio(id) {

    const doc = await db.get(id);
        
        if (stockId in doc.portfolio) {
            return doc.portfolio[stockId];
        } else {
            console.log('Error retrieving data:', "not found");
        }
        return doc;

    try {

    } catch (err) {
        console.log("error", );
    }

    /*
    try {
      const response = await fetch(`/readStocksInPortfolio`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
    */
  }

  /*
  
  export async function removeStockFromPortfolio(id) {
    
    try {
      const response = await fetch(`/removeFromPortfolio?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      }
      );
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
    return null;
    
  }

  */

