import ToastMessage from "../../alerts/ToastMessage.js";
import Notification from "../../alerts/Notification.js";
import SubscriptionModel from "../subscription/SubscriptionModel.js";

async function handleSubscribeStatus(event) {
  const subscribeButton = event.target;
  const mediaName = subscribeButton.dataset.mediaName;

  if (!SubscriptionModel.isSubscribed(mediaName)) {
    SubscriptionModel.addSubscription(mediaName);
    subscribeButton.textContent = 'x';
    ToastMessage('내가 구독한 언론사에 추가되었습니다.');
  } else {
    const confirmed = await Notification(mediaName);
    if (confirmed) {
      SubscriptionModel.removeSubscription(mediaName);
      subscribeButton.textContent = '+ 구독하기';
    }
  }
}

async function initSubscriptionStatus() {
  if (!localStorage.getItem('subscriptionStatus')) {
    await SubscriptionModel.initDefaultSubscriptions();
  }
}

export { handleSubscribeStatus, initSubscriptionStatus };