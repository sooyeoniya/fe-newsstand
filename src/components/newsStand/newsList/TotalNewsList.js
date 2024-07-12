import { getTabsNews } from "../../../apis/NewsAPI.js";
import { renderNewsItem } from "./NewsListRenderer.js";

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

    const subscriptionStatus = JSON.parse(localStorage.getItem("subscriptionStatus")) || {};

    if (!subscriptionStatus[newsItem.mediaName]) {
      subscriptionStatus[newsItem.mediaName] = "N";
      localStorage.setItem("subscriptionStatus", JSON.stringify(subscriptionStatus));
    }

    renderNewsItem(newsContainer, newsItem, subscriptionStatus);
  } catch (error) {
    console.error(error);
  }
}