import { getTabsNews } from "../../apis/NewsAPI.js";
import { initNewsListRenderer } from "./newsList/NewsListManager.js";
import { initTabManager } from "./newsTab/NewsTabManager.js";
import { setTabsContainer } from "../state/StateManager.js";

// 전체 뉴스 스탠드 초기화
async function initNewsTabs() {
  const tabsContainer = document.querySelector(".news-tabs");
  setTabsContainer(tabsContainer);

  try {
    const newsTabs = await getTabsNews();
    await initTabManager(newsTabs);
    await initNewsListRenderer();
  } catch (error) {
    console.error(error);
  }
}

export { initNewsTabs };