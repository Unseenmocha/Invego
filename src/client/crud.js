//import { saveId, getCurrentId } from "./userId";

/* Frontend CRUD operations; only coding what is necessary
 * 
 * user -> CRUD
 * portfolio -> R (only read, other changes to the database are defined on the server side)
 * transaction -> CRUD (transactions still need to be defined on the server side)
*/


/**
 *  functions derived from other CRUD operations
 */


export async function login(username,password) {
  // uses readUser
  try {
    await readUser(username).then((response) => {
      //saveId(response.id); // will this work?
      return response; //Maybe having return?
      // route to discovery page here, if that is necessary
    });
  } catch (err) {
    console.log(err);
  }

}

export async function signup(username, password) {
  // uses createUser

  const doc = getSampleStockObject();
  doc.username = username;
  doc.password = password;

  try {
    await createUser(doc).then((response) => {
      saveId(response.id); // will this work?
      // route to discovery page here, if that is necessary
    });
  } catch (err) {
    console.log(err);
  }
  
}

export async function buy() {
  // uses createTransaction
}

export async function sell() {
  // uses createTransaction
}


/**
 *  CRUD for users
 */

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

export async function createUser(doc) {
  // creates user according to the doc object supplied (follows user schema)

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doc)
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
      return data;
    });
    
  } catch(err) {
    console.log(err);
  }


}

export async function readUser(username) {  
  // reads user according to the id supplied
  try{
    const response = await fetch(`/user/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
      return data;
    }
    );
  } catch(err) {
    console.log(err);
  }
}

export async function updateUser(doc) {
  try {
    const response = await fetch(`${doc.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doc)
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
      return data;
    });
  } catch(err) {
    console.log(err);
  } 
}

export async function deleteUser(doc) {
  try {
    const response = await fetch(`${doc.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
      return data;
    }
    );
  } catch (err) {
    console.log(err);
  }
}

/**
 *  R for portfolio
 */

export async function readPortfolio() {
  // returns portfolio object
  try {
    const response = await fetch(`/portfolio/${getCurrentId()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
      return data;
    });
  } catch(err) {
    console.log(err);
  }
}

