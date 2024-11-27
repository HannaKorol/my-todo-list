export function saveToStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  
  export function loadFromStorage() {
    const data = localStorage.getItem('projects');
    return data ? JSON.parse(data) : [];
  }
  