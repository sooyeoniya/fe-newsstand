import { animateProgressBar } from "./NewsTabAnimation.js";
import { addArrowButtonClickListener } from "../../button/ButtonEvents.js";
import {
  getTabsContainer,
  setTotalActiveTabIndex,
  setTotalPageCount
} from "../../state/StateManager.js";
import NewsTab from "./NewsTab.js";
import { addTabClickListener } from "./NewsTabControll.js";

// 전체 페이지 및 탭 상태 초기화
function initState() {
  setTotalPageCount(1);
  setTotalActiveTabIndex(0);
}

// 각 탭 버튼 초기화
function initTabs(newsTabs) {
  const tabsContainer = getTabsContainer();
  newsTabs.forEach((tabData, index) => {
    const tabButton = NewsTab(tabData, index);
    tabsContainer.appendChild(tabButton);
  });
}

// 프로그래스바 애니메이션 시작
function startProgressBarAnimation(newsTabs) {
  const tabsContainer = getTabsContainer();
  const activeTab = tabsContainer.querySelector(".tab.active");
  if (activeTab) animateProgressBar(activeTab, newsTabs);
}

// 전체 탭 초기화
async function initTabManager(newsTabs) {
  initState();
  initTabs(newsTabs);
  addTabClickListener(newsTabs);
  startProgressBarAnimation(newsTabs);
  addArrowButtonClickListener(newsTabs);
}

export { initTabManager };