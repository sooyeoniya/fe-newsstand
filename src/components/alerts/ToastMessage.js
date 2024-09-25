import { ANIMATION_DURATION } from "../../constants/constants";
import "./Alerts.css";

export default function ToastMessage(message) {
  const container = document.querySelector(".container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    }, { once: true });
  }, ANIMATION_DURATION);
}