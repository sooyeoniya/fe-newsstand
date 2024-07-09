const NEWS_API_URL = 'http://localhost:3000';

export function getNewsData() {
  return fetch(`${NEWS_API_URL}/data`)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      throw error;
    });
}