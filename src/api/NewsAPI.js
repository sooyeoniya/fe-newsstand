const NEWS_API_URL = 'http://localhost:3000';

export function getTopNews() {
  return fetch(`${NEWS_API_URL}/topNewsData`)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getTabsNews(category = null) {
  let url = `${NEWS_API_URL}/tabNewsData`;
  if (category) url += `?category=${category}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (category) return data.find(tab => tab.category === category);
      else return data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}