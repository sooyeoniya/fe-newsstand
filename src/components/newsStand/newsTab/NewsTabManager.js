import { animateProgressBar } from "./NewsTabAnimation.js";
import { initNewsListRenderer } from "../newsList/NewsListManager.js";
import { addArrowButtonClickListener } from "../../button/ButtonEvents.js";
import { removeTabContent, updateTabContent } from "./NewsTabContents.js";
import { getActiveTabIndex, setActiveTabIndex, setPageCount } from "../../state/StateManager.js";
import NewsTab from "./NewsTab.js";

// 활성화 탭 변경(활성화 시 탭 내부 구조 변경 및 프로그래스바 진행 추가를 위함)
function updateActiveTab(tabsContainer, newsTabs) {
  const tabs = tabsContainer.querySelectorAll(".tab");
  const activeTabIndex = getActiveTabIndex();
  tabs.forEach((tab, index) => {
    if (index === activeTabIndex) {
      tab.classList.add("active");
      updateTabContent(tab, newsTabs);
      animateProgressBar(tab, tabsContainer, newsTabs);
    } else {
      tab.classList.remove("active");
      removeTabContent(tab);
    }
  });
  initNewsListRenderer();
}

// 클릭한 카테고리 탭으로 이동
function addTabClickListener(tabsContainer, newsTabs) {
  tabsContainer.addEventListener("click", (event) => {
    const clickedTab = event.target.closest(".tab");
    if (!clickedTab) return;

    const tabs = tabsContainer.querySelectorAll(".tab");
    tabs.forEach((tab, index) => {
      if (tab === clickedTab) {
        setActiveTabIndex(index);
        setPageCount(1);
        updateActiveTab(tabsContainer, newsTabs);
      }
    });
  });
}

// 각 탭 버튼 초기화
function initTabs(tabsContainer, newsTabs) {
  newsTabs.forEach((tabData, index) => {
    const tabButton = NewsTab(tabData, index);
    tabsContainer.appendChild(tabButton);
  });
}

// 전체 탭 초기화 함수
async function initTabManager(tabsContainer, newsTabs) {
  setPageCount(1);
  setActiveTabIndex(0);

  initTabs(tabsContainer, newsTabs);
  addTabClickListener(tabsContainer, newsTabs);
  animateProgressBar(tabsContainer.querySelector('.tab.active'), tabsContainer, newsTabs);
  addArrowButtonClickListener(tabsContainer, newsTabs);
}

export { initTabManager, updateActiveTab };