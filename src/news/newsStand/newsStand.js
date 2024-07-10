import { getTabsNews } from "../../apis/NewsAPI.js";
import { initNewsContentRenderer } from "./newsList.js";
import { initTabManager } from "./newsTab.js";

async function initNewsTabs() {
  const tabsContainer = document.querySelector('.news-tabs');

  try {
    const newsTabs = await getTabsNews();
    initTabManager(tabsContainer, newsTabs);
    await initNewsContentRenderer();
  } catch (error) {
    console.error(error);
  }
}

initNewsTabs();