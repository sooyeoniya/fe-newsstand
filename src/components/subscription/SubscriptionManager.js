import { getTabsNews } from "../../apis/NewsAPI.js";
import { setSubscriptionStatus } from "../../helpers/subscriptionHelpers.js";

// 내가 구독한 언론사 데이터 초기화
async function initSubscriptionStatus() {
  const subscriptionStatus = {};
  try {
    const newsTabs = await getTabsNews();
    newsTabs.forEach(tab => {
      tab.tabData.forEach(newsItem => {
        subscriptionStatus[newsItem.mediaName] = "N";
      });
    });
    setSubscriptionStatus(subscriptionStatus);
  } catch (error) {
    console.error(error);
  }
}

export { initSubscriptionStatus };