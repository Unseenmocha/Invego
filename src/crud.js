export async function createStock(name) {
    const response = await fetch(`/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });
    const data = await response.json();
    return data;
  }
  
  export async function readStock(name) {
    try {
      const response = await fetch(`/read?name=${name}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function updateStock(name) {
    try {
      const response = await fetch(`/update?name=${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
      });
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
    return null;
  }
  
  export async function deleteStock(name) {
    try {
      const response = await fetch(`/delete?name=${name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
      }
      );
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
    return null;
  }
  
  export async function readAllStocks() {
    const response = await fetch(`/dump`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }
  