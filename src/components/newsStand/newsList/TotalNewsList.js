import { getTabsNews } from "../../../apis/NewsAPI.js";
import { renderNewsItem } from "./NewsListRenderer.js";
import { getSubscriptionStatus, setSubscriptionStatus } from "../../../helpers/subscriptionHelpers.js";

function getActiveTabAndCategory() {
  const activeTab = document.querySelector(".news-tabs .tab.active");
  if(!activeTab) return;

  const activeCategory = activeTab.getAttribute("data-tab");
  if(!activeCategory) return;

  return { activeTab, activeCategory };
}

function ensureSubscriptionStatus(subscriptionStatus, mediaName) {
  if (!subscriptionStatus[mediaName]) {
    subscriptionStatus[mediaName] = "N";
    setSubscriptionStatus(subscriptionStatus);
  }
}

function getCurrentPage() {
  const pageInfo = document.querySelector(".page-info");
  return parseInt(pageInfo.textContent.split("/")[0], 10) - 1;
}

// 전체 언론사 리스트
export default async function TotalNewsList() {
  const newsContainer = document.querySelector(".news-container");
  const { activeTab, activeCategory } = getActiveTabAndCategory();
  if(!activeTab || !activeCategory) return;

  try {
    const activeTabData = await getTabsNews(activeCategory);
    if (!activeTabData) return;

    const currentPage = getCurrentPage();

    const newsItem = activeTabData.tabData[currentPage];
    if (!newsItem) return;

    const subscriptionStatus = getSubscriptionStatus();

    ensureSubscriptionStatus(subscriptionStatus, newsItem.mediaName);
    renderNewsItem(newsContainer, newsItem, subscriptionStatus);
  } catch (error) {
    console.error(error);
  }
}