import { getTabsNews } from "../../../apis/NewsAPI.js";
import { setSubTotalPages, getSubCurrentPage } from "../../state/StateManager.js";
import { renderNewsItem } from "./NewsListRenderer.js";
import { getSubscriptionStatus } from "../../../helpers/subscriptionHelpers.js";

const NO_SUBSCRIPTIONS_MESSAGE = '<p class="no-subscribe">구독한 언론사가 없습니다.</p>';

function getSubscribedMediaNames(subscriptionStatus) {
  return Object.keys(subscriptionStatus).filter(
    mediaName => subscriptionStatus[mediaName] === "Y"
  );
}

async function getFilteredNewsItems(subscribedMediaNames) {
  const newsTabs = await getTabsNews();
  return newsTabs.flatMap(tab => 
    tab.tabData.filter(newsItem => subscribedMediaNames.includes(newsItem.mediaName))
  )
}

function displayNoSubscriptionMessage(newsContainer) {
  newsContainer.innerHTML = NO_SUBSCRIPTIONS_MESSAGE;
}

async function renderSubscribedNewsList(newsContainer, subscriptionStatus, subscribedMediaNames) {
  const filteredNewsItems = await getFilteredNewsItems(subscribedMediaNames);

  if (filteredNewsItems.length === 0) {
    displayNoSubscriptionMessage(newsContainer);
    return;
  }

  setSubTotalPages(filteredNewsItems.length);
  
  const currentPage = getSubCurrentPage() || 1;
  const newsItem = filteredNewsItems[currentPage - 1];

  renderNewsItem(newsContainer, newsItem, subscriptionStatus);
}

// 내가 구독한 언론사 리스트
export default async function SubscribedNewsList() {
  const newsContainer = document.querySelector(".media-my-view .news-container");
  const subscriptionStatus = getSubscriptionStatus();
  const subscribedMediaNames = getSubscribedMediaNames(subscriptionStatus);

  if (subscribedMediaNames.length === 0) {
    displayNoSubscriptionMessage(newsContainer);
    return;
  }

  try {
    renderSubscribedNewsList(newsContainer, subscriptionStatus, subscribedMediaNames);
  } catch (error) {
    console.error(error);
  }
}