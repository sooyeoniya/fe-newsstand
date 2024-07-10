import { getTabsNews } from "../../apis/NewsAPI.js";
import { initNewsContentRenderer } from "./newsList/NewsList.js";
import { initTabManager } from "./newsTab/NewsTab.js";

async function initNewsTabs() {
  const tabsContainer = document.querySelector(".news-tabs");

  try {
    const newsTabs = await getTabsNews();
    initTabManager(tabsContainer, newsTabs);
    await initNewsContentRenderer();
  } catch (error) {
    console.error(error);
  }
}

initNewsTabs();