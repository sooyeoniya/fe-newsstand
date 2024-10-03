import { ANIMATION_DURATION } from "../../constants/constants";
import "./Alerts.css";

function createToastElement(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  return toast;
}

function animateToast(toast) {
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      toast.classList.remove("show");
      toast.addEventListener("transitionend", () => {
        toast.remove();
        resolve();
      }, { once: true });
    }, ANIMATION_DURATION);
  });
}

async function showToastMessage(message) {
  const container = document.querySelector(".container");
  const toast = createToastElement(message);
  container.appendChild(toast);

  await animateToast(toast);
  // TODO: 토스트 애니메이션 완료 후 내가 구독한 언론사 카테고리로 이동
}

export default function ToastMessage(message) {
  showToastMessage(message);
}