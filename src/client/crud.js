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

export async function signup(username, password, firstName, lastName) {
  // uses createUser

  const doc = getSampleStockObject();
  doc.username = username;
  doc.password = password;
  doc.firstName = firstName;
  doc.lastName = lastName;
  try {
    await createUser(doc).then((response) => {
      localStorage.setItem('currentUser', username);
      // route to discovery page here, if that is necessary
    });
  } catch (err) {
    console.log(err);
  }

}

export async function buy(username1, username2, desiredPrice, shares) {

  /* 
    req should have:
    {
        username1: the current user
        // username2: the user to buy from // nevermind, the user doesn't determine who they buy from
        username2: the user stock
        desiredPrice: the desired price
        shares: the number of shares bought/sold

    }
    */
  
  try {
    const response = await fetch(`http://localhost:5000/portfolio/buy`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username1: username1,
        username2: username2,
        desiredPrice: desiredPrice,
        shares: shares
      })
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }





}

export async function sell(username1, username2, desiredPrice, shares) {
    /* 
    req should have:
    {
        username1: the current user
        // username2: the user to buy from // nevermind, the user doesn't determine who they buy from
        username2: the user stock
        desiredPrice: the desired price
        shares: the number of shares bought/sold

    }
    */
  try {
    const response = await fetch('http://localhost:5000/portfolio/sell', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username1: username1,
        username2: username2,
        desiredPrice: desiredPrice,
        shares: shares
      })
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
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
    total_shares_owned: 0
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

export async function readAllUsers() {
  try {
    const response = await fetch(`http://localhost:5000/user/`, {
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

export async function updateUser(doc, changes) {
  try {
    const response = await fetch(`http://localhost:5000/user/${doc.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changes)
    })
    const data = await response.json();
    if (data.message === undefined && changes.username !== undefined) { //if the username changed store it again
      localStorage.setItem("currentUser", changes.username);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUser(doc) {
  try {
    const response = await fetch(`http://localhost:5000/user/${doc.username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
    return data;
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