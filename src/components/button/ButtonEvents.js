import { updateActiveTab } from '../newsStand/newsTab/NewsTab.js';

function addArrowButtonClickListener(tabsContainer, newsTabs, tabState) {
  const leftButton = document.querySelector('.left-btn');
  const rightButton = document.querySelector('.right-btn');

  leftButton.addEventListener('click', () => {
    const tabs = tabsContainer.querySelectorAll('.tab');
    const activeTabIndex = tabState.activeTabIndex;
    const activeTab = tabs[activeTabIndex];

    const animationId = parseInt(activeTab.dataset.animationId);
    if (animationId) {
      cancelAnimationFrame(animationId);
      delete activeTab.dataset.animationId;
    }

    tabState.pageCount--;
    if (tabState.pageCount < 1) {
      const prevTabIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
      tabState.activeTabIndex = prevTabIndex;
      tabState.pageCount = newsTabs[prevTabIndex].tabData.length;
    }

    updateActiveTab(tabsContainer, newsTabs, tabState);
  });

  rightButton.addEventListener('click', () => {
    const tabs = tabsContainer.querySelectorAll('.tab');
    const activeTabIndex = tabState.activeTabIndex;
    const tabData = newsTabs[activeTabIndex];
    const activeTab = tabs[activeTabIndex];

    const animationId = parseInt(activeTab.dataset.animationId);
    if (animationId) {
      cancelAnimationFrame(animationId);
      delete activeTab.dataset.animationId;
    }

    tabState.pageCount++;
    if (tabState.pageCount > tabData.tabData.length) {
      tabState.activeTabIndex = (activeTabIndex + 1) % tabs.length;
      tabState.pageCount = 1;
    }

    updateActiveTab(tabsContainer, newsTabs, tabState);
  });
}

export { addArrowButtonClickListener };