import { animateProgressBar } from "./NewsTabAnimation.js";
import { initNewsListRenderer } from "../newsList/NewsListManager.js";
import { addArrowButtonClickListener } from "../../button/ButtonEvents.js";
import { removeTabContent, updateTabContent } from "./NewsTabContents.js";
import NewsTab from "./NewsTab.js";

function updateActiveTab(tabsContainer, newsTabs, tabState) {
  const tabs = tabsContainer.querySelectorAll('.tab');
  tabs.forEach((tab, index) => {
    if (index === tabState.activeTabIndex) {
      tab.classList.add('active');
      updateTabContent(tab, newsTabs, tabState);
      animateProgressBar(tab, tabsContainer, newsTabs, tabState);
    } else {
      tab.classList.remove('active');
      removeTabContent(tab);
    }
  });
  initNewsListRenderer();
}

function addTabClickListener(tabsContainer, newsTabs, tabState) {
  tabsContainer.addEventListener('click', (event) => {
    const clickedTab = event.target.closest('.tab');
    if (!clickedTab) return;

    const tabs = tabsContainer.querySelectorAll('.tab');
    tabs.forEach((tab, index) => {
      if (tab === clickedTab) {
        tabState.activeTabIndex = index;
        tabState.pageCount = 1;
        updateActiveTab(tabsContainer, newsTabs, tabState);
      }
    });
  });
}

function initTabs(tabsContainer, newsTabs, tabState) {
  newsTabs.forEach((tabData, index) => {
    const tabButton = NewsTab(tabData, index, tabState);
    tabsContainer.appendChild(tabButton);
  });
}

async function initTabManager(tabsContainer, newsTabs) {
  const tabState = {
    pageCount: 1,
    activeTabIndex: 0
  };

  initTabs(tabsContainer, newsTabs, tabState);
  addTabClickListener(tabsContainer, newsTabs, tabState);
  animateProgressBar(tabsContainer.querySelector('.tab.active'), tabsContainer, newsTabs, tabState);
  addArrowButtonClickListener(tabsContainer, newsTabs, tabState);
}

export { initTabManager, updateActiveTab };