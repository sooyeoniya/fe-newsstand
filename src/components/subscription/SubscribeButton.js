import { renderToast } from "../alerts/ToastMessage.js";
import { renderNotification } from "../alerts/Notification.js";

// TODO: 해체할당과 이름바꾸기 방법으로 수정
async function handleSubscribeButtonClick(event) {
  const subscribeButton = event.target;
  const mediaName = subscribeButton.dataset.mediaName;
  const subscriptionStatus = JSON.parse(localStorage.getItem('subscriptionStatus'));

  if (subscriptionStatus[mediaName] === 'N') {
    subscriptionStatus[mediaName] = 'Y';
    subscribeButton.textContent = 'x';
    renderToast('내가 구독한 언론사에 추가되었습니다.');
  } else {
    const confirmed = await renderNotification(mediaName);
    if (confirmed) {
      subscriptionStatus[mediaName] = 'N';
      subscribeButton.textContent = '+ 구독하기';
    }
  }

  localStorage.setItem('subscriptionStatus', JSON.stringify(subscriptionStatus));
}

export { handleSubscribeButtonClick };