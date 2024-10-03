import "./Alerts.css";

function createNotificationElement(mediaName) {
  const confirmation = document.createElement("div");
  confirmation.className = "confirmation";
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
  return confirmation;
}

function handleNotificationClick(confirmationElement) {
  return new Promise((resolve) => {
    confirmationElement.addEventListener("click", (event) => {
      if (event.target.matches(".confirm-yes")) {
        confirmationElement.remove();
        resolve(true);
      } else if (event.target.matches(".confirm-no")) {
        confirmationElement.remove();
        resolve(false);
      }
    });
  });
}

export default function Notification(mediaName) {
  const container = document.querySelector(".container");
  const confirmationElement = createNotificationElement(mediaName);
  container.appendChild(confirmationElement);

  return handleNotificationClick(confirmationElement);
}