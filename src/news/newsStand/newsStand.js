import { getNewsData } from "../../api/NewsAPI.js";
import { initNewsContentRenderer } from "./newsList.js";
import { initTabManager } from "./newsTab.js";

async function initNewsTabs() {
  const tabsContainer = document.querySelector('.news-tabs');

  try {
    const newsTabs = await getNewsData().then(newsTabs => newsTabs[0].newsTabs);
    initTabManager(tabsContainer, newsTabs);
    initNewsContentRenderer();
  } catch (error) {
    console.error(error);
  }
}

initNewsTabs();