import { updateActiveTab } from '../newsStand/newsTab/NewsTabManager.js';
import { getCurrentPage, getCurrentView, getTotalPages, setCurrentPage } from "../state/StateManager.js";
import SubscribedNewsList from "../newsStand/newsList/SubscribedNewsList.js";

function addArrowButtonClickListener(tabsContainer, newsTabs, tabState) {
  const container = document.querySelector('.container');

  container.addEventListener('click', async (event) => {
    const isLeftButton = event.target.closest('.left-btn');
    const isRightButton = event.target.closest('.right-btn');

    if (isLeftButton || isRightButton) {
      const currentView = getCurrentView();
      if (currentView === "total") {
        const tabs = tabsContainer.querySelectorAll('.tab');
        const activeTabIndex = tabState.activeTabIndex;
        const activeTab = tabs[activeTabIndex];

        const animationId = parseInt(activeTab.dataset.animationId);
        if (animationId) {
          cancelAnimationFrame(animationId);
          delete activeTab.dataset.animationId;
        }

        if (isLeftButton) {
          tabState.pageCount--;
          if (tabState.pageCount < 1) {
            const prevTabIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
            tabState.activeTabIndex = prevTabIndex;
            tabState.pageCount = newsTabs[prevTabIndex].tabData.length;
          }
        } else if (isRightButton) {
          const tabData = newsTabs[activeTabIndex];
          tabState.pageCount++;
          if (tabState.pageCount > tabData.tabData.length) {
            tabState.activeTabIndex = (activeTabIndex + 1) % tabs.length;
            tabState.pageCount = 1;
          }
        }
        updateActiveTab(tabsContainer, newsTabs, tabState);
      } else if (currentView === "subscribed") {
        let currentPage = getCurrentPage();
        const totalPages = getTotalPages();

        if (isLeftButton) {
          currentPage--;
          if (currentPage < 1) {
            currentPage = totalPages;
          }
        } else if (isRightButton) {
          currentPage++;
          if (currentPage > totalPages) {
            currentPage = 1;
          }
        }

        setCurrentPage(currentPage);
        await SubscribedNewsList();
      }
    }
  });
}

export { addArrowButtonClickListener };