const NEWS_API_URL = import.meta.env.VITE_NEWS_API_URL;

const API_ENDPOINTS = {
  TOP_NEWS: "/topNewsData",
  TAB_NEWS: "/tabNewsData"
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function getTopNews() {
  return fetchData(`${NEWS_API_URL}${API_ENDPOINTS.TOP_NEWS}`);
}

export async function getTabsNews(category = null) {
  const url = `${NEWS_API_URL}${API_ENDPOINTS.TAB_NEWS}${category ? `?category=${category}` : ''}`;
  const data = await fetchData(url);
  return category ? data.find(tab => tab.category === category) : data;
}