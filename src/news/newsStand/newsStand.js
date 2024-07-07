import { TAB_NEWS_DATA } from "../../data/tabNewsData.js";
import { initNewsContentRenderer } from "./newsList.js";
import { initTabManager } from "./newsTab.js";

function initNewsTabs() {
  const tabsContainer = document.querySelector('.news-tabs');
  const newsTabs = TAB_NEWS_DATA.data[0].newsTabs;

  initTabManager(tabsContainer, newsTabs);
  initNewsContentRenderer();
}

initNewsTabs();