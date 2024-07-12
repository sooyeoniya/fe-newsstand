import { updateActiveTab } from "../newsStand/newsTab/NewsTabManager.js";
import {
  getSubCurrentPage,
  getCurrentView,
  getSubTotalPages,
  setSubCurrentPage,
  getTotalActiveTabIndex,
  getTotalPageCount,
  setTotalPageCount,
  setTotalActiveTabIndex,
  getTabsContainer
} from "../state/StateManager.js";
import SubscribedNewsList from "../newsStand/newsList/SubscribedNewsList.js";

function addArrowButtonClickListener(newsTabs) {
  const container = document.querySelector(".container");

  container.addEventListener("click", async (event) => {
    const isLeftButton = event.target.closest(".left-btn");
    const isRightButton = event.target.closest(".right-btn");

    if (isLeftButton || isRightButton) {
      const currentView = getCurrentView();
      const tabsContainer = getTabsContainer();
      if (currentView === "total") {
        const tabs = tabsContainer.querySelectorAll(".tab");
        const activeTabIndex = getTotalActiveTabIndex();
        const activeTab = tabs[activeTabIndex];

        const animationId = parseInt(activeTab.dataset.animationId);
        if (animationId) {
          cancelAnimationFrame(animationId);
          delete activeTab.dataset.animationId;
        }

        if (isLeftButton) {
          setTotalPageCount(getTotalPageCount() - 1);
          if (getTotalPageCount() < 1) {
            const prevTabIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
            setTotalActiveTabIndex(prevTabIndex);
            setTotalPageCount(newsTabs[prevTabIndex].tabData.length);
          }
        } else if (isRightButton) {
          const tabData = newsTabs[activeTabIndex];
          setTotalPageCount(getTotalPageCount() + 1);
          if (getTotalPageCount() > tabData.tabData.length) {
            setTotalActiveTabIndex((activeTabIndex + 1) % tabs.length);
            setTotalPageCount(1);
          }
        }
        updateActiveTab(newsTabs);
      } else if (currentView === "subscribed") {
        let currentPage = getSubCurrentPage();
        const totalPages = getSubTotalPages();

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

        setSubCurrentPage(currentPage);
        await SubscribedNewsList();
      }
    }
  });
}

export { addArrowButtonClickListener };