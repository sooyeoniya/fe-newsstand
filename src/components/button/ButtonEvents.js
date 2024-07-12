import { updateActiveTab } from "../newsStand/newsTab/NewsTabManager.js";
import {
  getCurrentPage,
  getCurrentView,
  getTotalPages,
  setCurrentPage,
  getActiveTabIndex,
  getPageCount,
  setPageCount,
  setActiveTabIndex
} from "../state/StateManager.js";
import SubscribedNewsList from "../newsStand/newsList/SubscribedNewsList.js";

function addArrowButtonClickListener(tabsContainer, newsTabs) {
  const container = document.querySelector(".container");

  container.addEventListener("click", async (event) => {
    const isLeftButton = event.target.closest(".left-btn");
    const isRightButton = event.target.closest(".right-btn");

    if (isLeftButton || isRightButton) {
      const currentView = getCurrentView();
      if (currentView === "total") {
        const tabs = tabsContainer.querySelectorAll(".tab");
        const activeTabIndex = getActiveTabIndex();
        const activeTab = tabs[activeTabIndex];

        const animationId = parseInt(activeTab.dataset.animationId);
        if (animationId) {
          cancelAnimationFrame(animationId);
          delete activeTab.dataset.animationId;
        }

        if (isLeftButton) {
          setPageCount(getPageCount() - 1);
          if (getPageCount() < 1) {
            const prevTabIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
            setActiveTabIndex(prevTabIndex);
            setPageCount(newsTabs[prevTabIndex].tabData.length);
          }
        } else if (isRightButton) {
          const tabData = newsTabs[activeTabIndex];
          setPageCount(getPageCount() + 1);
          if (getPageCount() > tabData.tabData.length) {
            setActiveTabIndex((activeTabIndex + 1) % tabs.length);
            setPageCount(1);
          }
        }
        updateActiveTab(tabsContainer, newsTabs);
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