import { setCurrentView } from "../../state/StateManager.js";

// 각 언론사 버튼 클릭 이벤트 리스너
function toggleView(activeButton, inactiveButton, activeView, inactiveView, viewName) {
  setCurrentView(viewName);
  activeButton.classList.add("active");
  inactiveButton.classList.remove("active");
  activeView.classList.add("active");
  inactiveView.classList.remove("active");
}

function mediaButtonEvents() {
  const mediaTotalButton = document.querySelector(".media-total");
  const mediaMyButton = document.querySelector(".media-my");
  const mediaTotalView = document.querySelector(".media-total-view");
  const mediaMyView = document.querySelector(".media-my-view");

  mediaTotalButton.addEventListener("click", () => {
    toggleView(mediaTotalButton, mediaMyButton, mediaTotalView, mediaMyView, "total");
  });

  mediaMyButton.addEventListener("click", () => {
    toggleView(mediaMyButton, mediaTotalButton, mediaMyView, mediaTotalView, "subscribed");
  });
}

export { mediaButtonEvents };