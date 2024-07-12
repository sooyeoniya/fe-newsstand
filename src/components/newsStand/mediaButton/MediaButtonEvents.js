import { setCurrentView } from "../../state/StateManager.js";

function toggleMediaView(totalButton, myButton, totalView, myView) {
  totalButton.classList.toggle("active");
  myButton.classList.toggle("active");
  totalView.classList.toggle("active");
  myView.classList.toggle("active");
}

function mediaButtonEvents() {
  const mediaTotalButton = document.querySelector(".media-total");
  const mediaMyButton = document.querySelector(".media-my");
  const mediaTotalView = document.querySelector(".media-total-view");
  const mediaMyView = document.querySelector(".media-my-view");

  mediaTotalButton.addEventListener("click", () => {
    toggleMediaView(mediaTotalButton, mediaMyButton, mediaTotalView, mediaMyView);
    setCurrentView("total");
  });

  mediaMyButton.addEventListener("click", () => {
    toggleMediaView(mediaMyButton, mediaTotalButton, mediaMyView, mediaTotalView);
    setCurrentView("subscribed");
  });
}

export { mediaButtonEvents };