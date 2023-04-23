export async function createAccount(username, password) {
  const response = await fetch('/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return response;
}


export async function readAccount(username, password) {
  try {
    const response = await fetch('/read?name=${name}', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return response;
  }
  catch (err) {
    console.log(err);
  }
}