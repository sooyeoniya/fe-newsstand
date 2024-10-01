import ToastMessage from "../alerts/ToastMessage.js";
import Notification from "../alerts/Notification.js";
import SubscribedNewsList from "../newsStand/newsList/SubscribedNewsList.js";
import { getSubscriptionStatus } from "../../helpers/subscriptionHelpers.js";

// 구독 처리 기능
async function handleSubscribeButtonClick(event) {
  const subscribeButton = event.target;
  const mediaName = subscribeButton.dataset.mediaName;
  const subscriptionStatus = getSubscriptionStatus();

  if (subscriptionStatus[mediaName] === "N") {
    subscriptionStatus[mediaName] = "Y";
    subscribeButton.textContent = "x";
    ToastMessage("내가 구독한 언론사에 추가되었습니다.");
  } else {
    const confirmed = await Notification(mediaName);
    if (confirmed) {
      subscriptionStatus[mediaName] = "N";
      subscribeButton.textContent = "+ 구독하기";
    }
  }

  setSubscriptionStatus(subscriptionStatus);
  await SubscribedNewsList();
}

export { handleSubscribeButtonClick };