import { updateActiveTab } from "../newsStand/newsTab/NewsTabControll.js";
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
import { VIEW_TYPES, BUTTON_TYPES } from "../../constants/constants.js";

// 좌우 버튼 기능
function addArrowButtonClickListener(newsTabs) {
  const container = document.querySelector(".container");
  container.addEventListener("click", handleArrowButtonClick(newsTabs));
}

function handleArrowButtonClick(newsTabs) {
  return async (event) => {
    const buttonType = getButtonType(event);
    if (!buttonType) return;

    const currentView = getCurrentView();
    if (currentView === VIEW_TYPES.TOTAL) {
      handleTotalButtonClick(newsTabs, buttonType);
    } else if (currentView === VIEW_TYPES.SUBSCRIBED) {
      await handleSubscribedButtonClick(buttonType);
    }
  }
}

function getButtonType(event) {
  const button = event.target.closest(".left-btn") || event.target.closest(".right-btn");
  if (!button) return;
  return button.classList.contains("left-btn") ? BUTTON_TYPES.LEFT : BUTTON_TYPES.RIGHT;
}

function handleTotalButtonClick(newsTabs, buttonType) {
  const tabsContainer = getTabsContainer();
  const tabs = tabsContainer.querySelectorAll(".tab");

  const activeTabIndex = getTotalActiveTabIndex();
  const activeTab = tabs[activeTabIndex];

  cancelOngoingAnimation(activeTab);

  if (buttonType === BUTTON_TYPES.LEFT) {
    navigateToPreviousPage(newsTabs, tabs, activeTabIndex);
  } else if (buttonType === BUTTON_TYPES.RIGHT) {
    navigateToNextPage(newsTabs, tabs, activeTabIndex);
  }
  updateActiveTab(newsTabs);
}

function cancelOngoingAnimation(activeTab) {
  const animationId = parseInt(activeTab.dataset.animationId);
  if (animationId) {
    cancelAnimationFrame(animationId);
    delete activeTab.dataset.animationId;
  }
}

function navigateToPreviousPage(newsTabs, tabs, activeTabIndex) {
  setTotalPageCount(getTotalPageCount() - 1);
  if (getTotalPageCount() < 1) {
    const prevTabIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
    setTotalActiveTabIndex(prevTabIndex);
    setTotalPageCount(newsTabs[prevTabIndex].tabData.length);
  }
}

function navigateToNextPage(newsTabs, tabs, activeTabIndex) {
  const tabData = newsTabs[activeTabIndex];
  setTotalPageCount(getTotalPageCount() + 1);
  if (getTotalPageCount() > tabData.tabData.length) {
    setTotalActiveTabIndex((activeTabIndex + 1) % tabs.length);
    setTotalPageCount(1);
  }
}

async function handleSubscribedButtonClick(buttonType) {
  let currentPage = getSubCurrentPage();
  const totalPages = getSubTotalPages();

  currentPage = buttonType === BUTTON_TYPES.LEFT 
    ? (currentPage > 1 ? currentPage - 1 : totalPages) 
    : (currentPage < totalPages ? currentPage + 1 : 1);

  setSubCurrentPage(currentPage);
  await SubscribedNewsList();
}

export { addArrowButtonClickListener };