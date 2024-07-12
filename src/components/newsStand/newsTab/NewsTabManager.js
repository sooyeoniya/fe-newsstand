import { animateProgressBar } from "./NewsTabAnimation.js";
import { addArrowButtonClickListener } from "../../button/ButtonEvents.js";
import {
  getTabsContainer,
  setTotalActiveTabIndex,
  setTotalPageCount
} from "../../state/StateManager.js";
import NewsTab from "./NewsTab.js";
import { addTabClickListener } from "./NewsTabControll.js";

// 각 탭 버튼 초기화
function initTabs(newsTabs) {
  const tabsContainer = getTabsContainer();
  newsTabs.forEach((tabData, index) => {
    const tabButton = NewsTab(tabData, index);
    tabsContainer.appendChild(tabButton);
  });
}

// 전체 탭 초기화
async function initTabManager(newsTabs) {
  const tabsContainer = getTabsContainer();
  setTotalPageCount(1);
  setTotalActiveTabIndex(0);

  initTabs(newsTabs);
  addTabClickListener(newsTabs);
  animateProgressBar(tabsContainer.querySelector(".tab.active"), newsTabs);
  addArrowButtonClickListener(newsTabs);
}

export { initTabManager };