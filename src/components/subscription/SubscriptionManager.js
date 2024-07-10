import {getTabsNews} from "../../apis/NewsAPI.js";

async function initializeSubscriptionStatus() {
  const subscriptionStatus = {};
  try {
    const newsTabs = await getTabsNews();
    newsTabs.forEach(tab => {
      tab.tabData.forEach(newsItem => {
        subscriptionStatus[newsItem.mediaName] = 'N';
      });
    });
    localStorage.setItem('subscriptionStatus', JSON.stringify(subscriptionStatus));
  } catch (error) {
    console.error(error);
  }
}

export { initializeSubscriptionStatus };