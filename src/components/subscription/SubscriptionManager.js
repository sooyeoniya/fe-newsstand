import { getTabsNews } from "../../apis/NewsAPI.js";
import { setSubscriptionStatus } from "../../helpers/subscriptionHelpers.js";
import { SUBSCRIPTION_STATUS } from "../../constants/constants.js";

function extractMediaName(newsTabs) {
  return newsTabs.flatMap(tab => tab.tabData.map(newsItem => newsItem.mediaName));
}

function createInitSubscriptionStatus(mediaNames) {
  return mediaNames.reduce((status, mediaName) => {
    status[mediaName] = SUBSCRIPTION_STATUS.UNSUBSCRIBED;
    return status;
  }, {});
}

// 내가 구독한 언론사 데이터 초기화
async function initSubscriptionStatus() {
  try {
    const newsTabs = await getTabsNews();
    const mediaNames = extractMediaName(newsTabs);
    const subscriptionStatus = createInitSubscriptionStatus(mediaNames);
    setSubscriptionStatus(subscriptionStatus);
  } catch (error) {
    console.error(error);
  }
}

export { initSubscriptionStatus };