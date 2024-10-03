import ToastMessage from "../alerts/ToastMessage.js";
import Notification from "../alerts/Notification.js";
import SubscribedNewsList from "../newsStand/newsList/SubscribedNewsList.js";
import { getSubscriptionStatus, setSubscriptionStatus } from "../../helpers/subscriptionHelpers.js";
import { SUBSCRIBE_BUTTON_TEXT, SUBSCRIPTION_STATUS } from "../../constants/constants.js";

async function handleSubscription(subscriptionStatus, mediaName, subscribeButton) {
  subscriptionStatus[mediaName] = SUBSCRIPTION_STATUS.SUBSCRIBED;
  subscribeButton.textContent = SUBSCRIBE_BUTTON_TEXT.UNSUBSCRIBE;
  ToastMessage("내가 구독한 언론사에 추가되었습니다.");
  return true;
}

async function handleUnsubscription(subscriptionStatus, mediaName, subscribeButton) {
  const confirmed = await Notification(mediaName);
  if (confirmed) {
    subscriptionStatus[mediaName] = SUBSCRIPTION_STATUS.UNSUBSCRIBED;
    subscribeButton.textContent = SUBSCRIBE_BUTTON_TEXT.SUBSCRIBE;
  }
  return confirmed;
}

// 구독 처리 기능
async function handleSubscribeButtonClick(event) {
  const subscribeButton = event.target;
  const mediaName = subscribeButton.dataset.mediaName;
  const subscriptionStatus = getSubscriptionStatus();
  console.log(subscriptionStatus);
  const isCurrentlySubscribed = subscriptionStatus[mediaName] === SUBSCRIPTION_STATUS.SUBSCRIBED;

  let actionPerformed = false;
  if (isCurrentlySubscribed) {
    actionPerformed = await handleUnsubscription(subscriptionStatus, mediaName, subscribeButton);
  } else {
    actionPerformed = await handleSubscription(subscriptionStatus, mediaName, subscribeButton);
  }

  if (actionPerformed) {
    setSubscriptionStatus(subscriptionStatus);
    await SubscribedNewsList();
  }
}

export { handleSubscribeButtonClick };