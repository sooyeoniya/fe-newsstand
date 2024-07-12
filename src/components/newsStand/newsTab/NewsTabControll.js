import {
  getTabsContainer,
  getTotalActiveTabIndex,
  setTotalActiveTabIndex,
  setTotalPageCount
} from "../../state/StateManager.js";
import { removeTabContent, updateTabContent } from "./NewsTabContents.js";
import { animateProgressBar } from "./NewsTabAnimation.js";
import { initNewsListRenderer } from "../newsList/NewsListManager.js";

// 활성화 탭으로 변경(활성화 시 탭 내부 구조 변경 및 프로그래스바 진행 추가를 위함)
function updateActiveTab(newsTabs) {
  const tabsContainer = getTabsContainer();
  const tabs = tabsContainer.querySelectorAll(".tab");
  const activeTabIndex = getTotalActiveTabIndex();
  tabs.forEach((tab, index) => {
    if (index === activeTabIndex) {
      tab.classList.add("active");
      updateTabContent(tab, newsTabs);
      animateProgressBar(tab, newsTabs);
    } else {
      tab.classList.remove("active");
      removeTabContent(tab);
    }
  });
  initNewsListRenderer();
}

// 클릭한 카테고리 탭으로 이동
function addTabClickListener(newsTabs) {
  const tabsContainer = getTabsContainer();
  tabsContainer.addEventListener("click", (event) => {
    const clickedTab = event.target.closest(".tab");
    if (!clickedTab) return;

    const tabs = tabsContainer.querySelectorAll(".tab");
    tabs.forEach((tab, index) => {
      if (tab === clickedTab) {
        setTotalActiveTabIndex(index);
        setTotalPageCount(1);
        updateActiveTab(newsTabs);
      }
    });
  });
}

export { updateActiveTab, addTabClickListener };