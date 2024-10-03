import {
  getTabsContainer,
  getTotalActiveTabIndex,
  setTotalActiveTabIndex,
  setTotalPageCount
} from "../../state/StateManager.js";
import { removeTabContent, updateTabContent } from "./NewsTabContents.js";
import { animateProgressBar } from "./NewsTabAnimation.js";
import { initNewsListRenderer } from "../newsList/NewsListManager.js";

function activateTab(tab, newsTabs) {
  tab.classList.add("active");
  updateTabContent(tab, newsTabs);
  animateProgressBar(tab, newsTabs);
}

function deactivateTab(tab) {
  tab.classList.remove("active");
  removeTabContent(tab);
}

function updateTabStatus(tab, index, activeTabIndex, newsTabs) {
  if (index === activeTabIndex) activateTab(tab, newsTabs);
  else deactivateTab(tab);
}

// 활성화 탭으로 변경(활성화 시 탭 내부 구조 변경 및 프로그래스바 진행 추가를 위함)
function updateActiveTab(newsTabs) {
  const tabsContainer = getTabsContainer();
  const tabs = tabsContainer.querySelectorAll(".tab");
  const activeTabIndex = getTotalActiveTabIndex();

  tabs.forEach((tab, index) => updateTabStatus(tab, index, activeTabIndex, newsTabs));
  initNewsListRenderer();
}

function handleTabClick(clickedTab, tabs, newsTabs) {
  tabs.forEach((tab, index) => {
    if (tab === clickedTab) {
      setTotalActiveTabIndex(index);
      setTotalPageCount(1);
      updateActiveTab(newsTabs);
    }
  });
}

// 클릭한 카테고리 탭으로 이동
function addTabClickListener(newsTabs) {
  const tabsContainer = getTabsContainer();
  tabsContainer.addEventListener("click", (event) => {
    const clickedTab = event.target.closest(".tab");
    if (clickedTab) {
      const tabs = tabsContainer.querySelectorAll(".tab");
      handleTabClick(clickedTab, tabs, newsTabs);
    }
  });
}

export { updateActiveTab, addTabClickListener };