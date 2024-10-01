import { getTabsNews } from "../../../apis/NewsAPI.js";
import { renderNewsItem } from "./NewsListRenderer.js";
import { getSubscriptionStatus } from "../../../helpers/subscriptionHelpers.js";

// 전체 언론사 리스트
export default async function TotalNewsList() {
  const newsContainer = document.querySelector(".news-container");
  const activeTab = document.querySelector(".news-tabs .tab.active");
  if (!activeTab) return;

  const activeCategory = activeTab.getAttribute("data-tab");

  try {
    const activeTabData = await getTabsNews(activeCategory);
    if (!activeTabData) return;

    const pageInfo = activeTab.querySelector(".page-info");
    const currentPage = parseInt(pageInfo.textContent.split("/")[0], 10) - 1;
    const newsItem = activeTabData.tabData[currentPage];
    if (!newsItem) return;

    const subscriptionStatus = getSubscriptionStatus();

    if (!subscriptionStatus[newsItem.mediaName]) {
      subscriptionStatus[newsItem.mediaName] = "N";
      setSubscriptionStatus(subscriptionStatus);
    }

    renderNewsItem(newsContainer, newsItem, subscriptionStatus);
    
  } catch (error) {
    console.error(error);
  }
}