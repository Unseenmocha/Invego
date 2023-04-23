export async function createStock(id) {
    const response = await fetch(`/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    return data;
  }
  
  export async function readStock(id) {
    try {
      const response = await fetch(`/read?id=${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function updateStock(id) {
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
  }
  
  export async function deleteStock(id) {
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
  }
  
  export async function readAllStocks() {
    const response = await fetch(`/dump`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }
  


// within portfolio


export async function addStockToPortfolio(id) {
    const response = await fetch(`/addToPortfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    return data;
  }
  
  export async function readStocksInPortfolio(id) {
    try {
      const response = await fetch(`/readInPortfolio`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  
  /* // doesn't seem necessary?
  export async function updateStocksInPortfolio(id) {
    try {
      const response = await fetch(`/updateInPortfolio?id=${id}`, {
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
  }
  */
  
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
  
  /*
  export async function readAllStocksInPortfolio() {
    const response = await fetch(`/dump`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } */
  