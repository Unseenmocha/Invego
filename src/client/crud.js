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


export async function login(username, password) {
  // uses readUser
  const doc = getSampleStockObject();
  doc.username = username;
  doc.password = password;
  try {
    const response = await fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    });
    if (response.status === 200) {
      let user = await response.json();
      window.location.href = "http://localhost:5000/page/discovery";
      localStorage.setItem('currentUser', user.username);
    } else {
      console.log("crud.js:login()", response.message);
      alert("Login failed, Please double check your username and password");
    }
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
      localStorage.setItem('currentUser', user.username);
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
    //_id: "",
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
  console.log(doc)
  try {
    const response = await fetch('http://localhost:5000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doc)
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }


}

export async function readUser(doc) {
  // reads user according to the id supplied
  try {
    const response = await fetch(`http://localhost:5000/user/${doc.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function readTopFive() {
  try {
    const response = await fetch(`http://localhost:5000/user/topFive`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    return data;
  } catch (err) {
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
  } catch (err) {
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

export async function readPortfolio(username) {
  // returns portfolio object
  try {
    const response = await fetch(`http://localhost:5000/portfolio/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

3