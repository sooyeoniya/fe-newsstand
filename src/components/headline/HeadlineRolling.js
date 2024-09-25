import { ANIMATION_DURATION } from "../../constants/constants.js";
import renderHeadline from "./HeadlineRenderer.js";

// 롤링 기능
export default async function startRolling() {
  const rollingList1 = await renderHeadline(0, "headline-item-1");
  const rollingList2 = await renderHeadline(1, "headline-item-2");

  function roll(list) {
    const itemHeight = list.children[0].offsetHeight;
    const totalItems = list.children.length;
    let currentIdx = 0;
    let rollingInterval;

    function moveToNext() {
      list.style.transition = "top 0.5s ease";
      list.style.top = `-${currentIdx * itemHeight}px`;
      currentIdx = (currentIdx + 1) % totalItems;
    }

    function startInterval() {
      rollingInterval = setInterval(() => {
        moveToNext();
      }, ANIMATION_DURATION);
    }

    list.addEventListener("mouseenter", () => {
      clearInterval(rollingInterval);
    });

    list.addEventListener("mouseleave", () => {
      startInterval();
    });

    moveToNext();
    startInterval();
  }

  roll(rollingList1);
  setTimeout(() => {roll(rollingList2)}, 1000);
}