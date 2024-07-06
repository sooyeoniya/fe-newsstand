import { TAB_NEWS_DATA } from "../../data/tabNewsData.js";
import { initNewsContentRenderer } from "./newsList.js";
import { initTabManager } from "./newsTab.js";

function initNewsTabs() {
  const tabsContainer = document.querySelector('.news-tabs');
  const { data } = TAB_NEWS_DATA;
  const newsTabs = data[0].newsTabs;

  initTabManager(tabsContainer, newsTabs);
  initNewsContentRenderer();
}

initNewsTabs();