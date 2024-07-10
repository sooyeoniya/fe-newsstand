import { getTabsNews } from "../../apis/NewsAPI.js";
import { initNewsListRenderer } from "./newsList/NewsListManager.js";
import { initTabManager } from "./newsTab/NewsTab.js";

async function initNewsTabs() {
  const tabsContainer = document.querySelector(".news-tabs");

  try {
    const newsTabs = await getTabsNews();
    await initTabManager(tabsContainer, newsTabs);
    await initNewsListRenderer();
  } catch (error) {
    console.error(error);
  }
}

await initNewsTabs();