import { getTabsNews } from "../../../apis/NewsAPI.js";
import { setTotalPages, getCurrentPage } from "../../state/StateManager.js";
import { renderNewsItem } from "./NewsListRenderer.js";

export default async function SubscribedNewsList() {
  const newsContainer = document.querySelector(".media-my-view .news-container");
  const subscriptionStatus = JSON.parse(localStorage.getItem("subscriptionStatus")) || {};

  const subscribedMediaNames = Object.keys(subscriptionStatus).filter(
    mediaName => subscriptionStatus[mediaName] === "Y"
  );

  if (subscribedMediaNames.length === 0) {
    newsContainer.innerHTML = '<p class="no-subscribe">구독한 언론사가 없습니다.</p>';
    return;
  }

  try {
    const newsTabs = await getTabsNews();
    const filteredNewsItems = newsTabs.flatMap(tab =>
      tab.tabData.filter(newsItem => subscribedMediaNames.includes(newsItem.mediaName))
    );

    if (filteredNewsItems.length === 0) {
      newsContainer.innerHTML = '<p class="no-subscribe">구독한 언론사가 없습니다.</p>';
      return;
    }

    setTotalPages(filteredNewsItems.length);
    const currentPage = getCurrentPage() || 1;
    const newsItem = filteredNewsItems[currentPage - 1];

    renderNewsItem(newsContainer, newsItem, subscriptionStatus);

  } catch (error) {
    console.error(error);
  }
}