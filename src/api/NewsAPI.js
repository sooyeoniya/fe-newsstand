const NEWS_API_URL = 'http://localhost:3000';

export function getTopNews() {
  return fetch(`${NEWS_API_URL}/data`)
    .then(response => response.json())
    .then(data => data[0].topNews)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getNewsTabs() {
  return fetch(`${NEWS_API_URL}/data`)
    .then(response => response.json())
    .then(data => data[0].newsTabs)
    .catch(error => {
      console.error(error);
      throw error;
    });
}