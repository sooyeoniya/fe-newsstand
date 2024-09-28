import { setCurrentView } from "../../state/StateManager.js";
import { VIEW_TYPES } from "../../../constants/constants.js";

let buttons;
let views;

// DOM 요소 캐싱 함수
function cacheDOMElements() {
  buttons = {
    [VIEW_TYPES.TOTAL]: document.querySelector(".media-total"),
    [VIEW_TYPES.SUBSCRIBED]: document.querySelector(".media-my")
  };

  views = {
    [VIEW_TYPES.TOTAL]: document.querySelector(".media-total-view"),
    [VIEW_TYPES.SUBSCRIBED]: document.querySelector(".media-my-view")
  };
}

// 공통 뷰 토글 함수
function toggleView(viewName) {
  setCurrentView(viewName);

  // 모든 버튼과 뷰에서 'active' 클래스를 제거하고 선택한 것만 활성화
  Object.keys(buttons).forEach(key => {
    if (key === viewName) {
      buttons[key].classList.add("active");
      views[key].classList.add("active");
    } else {
      buttons[key].classList.remove("active");
      views[key].classList.remove("active");
    }
  });
}

// 이벤트 초기화 함수
function mediaButtonEvents() {
  // DOM 요소 캐싱
  cacheDOMElements();

  // 각 버튼에 클릭 이벤트 리스너 설정
  Object.keys(buttons).forEach(viewName => {
    if (buttons[viewName]) {
      buttons[viewName].addEventListener("click", () => toggleView(viewName));
    }
  });
}

export { mediaButtonEvents };