import { animateProgressBar } from "./NewsTabAnimation.js";
import { initNewsListRenderer } from "../newsList/NewsListManager.js";
import { addArrowButtonClickListener } from "../../button/ButtonEvents.js";
import NewsTab from "./NewsTab.js";

function initTabs(tabsContainer, newsTabs, tabState) {
  newsTabs.forEach((tabData, index) => {
    const tabButton = NewsTab(tabData, index, tabState);
    tabsContainer.appendChild(tabButton);
  });
}

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

function updateTabContent(tab, newsTabs, tabState) {
  const tabData = newsTabs[tabState.activeTabIndex];
  const pageInfo = tab.querySelector(".page-info");
  if (pageInfo) {
    pageInfo.textContent = `${tabState.pageCount}/${tabData.tabData.length}`;
  } else {
    tab.insertAdjacentHTML("beforeend", `
      <span class="page-info">${tabState.pageCount}/${tabData.tabData.length}</span>
      <span class="progress-bar"></span>
    `);
  }
}

function removeTabContent(tab) {
  const pageInfo = tab.querySelector(".page-info");
  const progressBar = tab.querySelector(".progress-bar");
  if (pageInfo) pageInfo.remove();
  if (progressBar) progressBar.remove();
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

export { initTabManager, updateActiveTab, updateTabContent, removeTabContent };