import { NEWS_API_URL, API_ENDPOINTS } from "../constants/constants.js";

export function getTopNews() {
  return fetch(`${NEWS_API_URL}${API_ENDPOINTS.TOP_NEWS}`)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getTabsNews(category = null) {
  let url = `${NEWS_API_URL}${API_ENDPOINTS.TAB_NEWS}`;
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