export function saveId(id) {
    localStorage.setItem('currentId', id);
  }
  
export function getCurrentId() {
    return localStorage.getItem('currentId');
}

