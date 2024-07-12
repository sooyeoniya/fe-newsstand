import ToastMessage from "../alerts/ToastMessage.js";
import Notification from "../alerts/Notification.js";
import SubscribedNewsList from "../newsStand/newsList/SubscribedNewsList.js";

async function handleSubscribeButtonClick(event) {
  const subscribeButton = event.target;
  const mediaName = subscribeButton.dataset.mediaName;
  const subscriptionStatus = JSON.parse(localStorage.getItem('subscriptionStatus'));

  if (subscriptionStatus[mediaName] === 'N') {
    subscriptionStatus[mediaName] = 'Y';
    subscribeButton.textContent = 'x';
    ToastMessage('내가 구독한 언론사에 추가되었습니다.');
  } else {
    const confirmed = await Notification(mediaName);
    if (confirmed) {
      subscriptionStatus[mediaName] = 'N';
      subscribeButton.textContent = '+ 구독하기';
    }
  }

  localStorage.setItem('subscriptionStatus', JSON.stringify(subscriptionStatus));
  await SubscribedNewsList();
}

export { handleSubscribeButtonClick };