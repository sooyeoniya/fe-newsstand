import { ANIMATION_DURATION, HEADLINE_ITEMS } from "../../constants/constants.js";
import renderHeadline from "./HeadlineRenderer.js";

const ROLLING_INTERVAL = 1000;

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

// 롤링 기능
export default async function startRolling() {
  const rollingList = await Promise.all(HEADLINE_ITEMS.map((headlineItemId, index) => 
    renderHeadline(index, headlineItemId)
  ));

  // TODO: 마우스 hover에서 벗어났을 경우 해당 롤링 영역을 기준으로 다른 롤링 영역 1초 뒤로 미루기
  // 현재는 처음 시작할 때만 두 롤링 사이 1초 간격을 두고 있음, 마우스 hover에 따라 롤링 영역 미루기 기능 추가 필요
  roll(rollingList[0]);
  setTimeout(() => {roll(rollingList[1])}, ROLLING_INTERVAL);
}