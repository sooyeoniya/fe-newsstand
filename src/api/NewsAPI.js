const NEWS_API_URL_1 = 'http://localhost:3001';
const NEWS_API_URL_2 = 'http://localhost:3002';

export function getTopNews() {
  return fetch(`${NEWS_API_URL_1}/topNewsData`)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getTabsNews() {
  return fetch(`${NEWS_API_URL_2}/tabNewsData`)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      throw error;
    });
}