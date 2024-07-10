import "./Alerts.css";

function renderNotification(mediaName) {
  return new Promise((resolve) => {
    const container = document.querySelector('.container');
    const confirmation = document.createElement('div');
    confirmation.className = 'confirmation';
    confirmation.innerHTML = `
      <div class="confirm-text">
        <span class="confirm-media">${mediaName}</span>
        <span class="confirm-description">을(를)</br>구독해지하시겠습니까?</span>
      </div>
      <div class="confirm-select">
        <div><button class="confirm-yes">예, 해지합니다</button></div>
        <div><button class="confirm-no">아니오</button></div>
      </div>
    `;
    container.appendChild(confirmation);

    confirmation.addEventListener('click', (event) => {
      if (event.target.matches('.confirm-yes')) {
        confirmation.remove();
        resolve(true);
      } else if (event.target.matches('.confirm-no')) {
        confirmation.remove();
        resolve(false);
      }
    });
  });
}

export { renderNotification };