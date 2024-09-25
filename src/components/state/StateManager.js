import { VIEW_TYPES } from "../../constants/constants";

// common
let currentView = VIEW_TYPES.TOTAL;
let tabsContainer = document.querySelector(".news-tabs");

// subscribed
let subCurrentPage = 1;
let subTotalPages = 1;

// total
let totalActiveTabIndex = 0;
let totalPageCount = 1;

export function getCurrentView() {
  return currentView;
}

export function setCurrentView(view) {
  currentView = view;
}

export function getTabsContainer() {
  return tabsContainer;
}

export function setTabsContainer(container) {
  tabsContainer = container;
}

export function getSubCurrentPage() {
  return subCurrentPage;
}

export function setSubCurrentPage(page) {
  subCurrentPage = page;
}

export function getSubTotalPages() {
  return subTotalPages;
}

export function setSubTotalPages(total) {
  subTotalPages = total;
}

export function getTotalActiveTabIndex() {
  return totalActiveTabIndex;
}

export function setTotalActiveTabIndex(index) {
  totalActiveTabIndex = index;
}

export function getTotalPageCount() {
  return totalPageCount;
}

export function setTotalPageCount(count) {
  totalPageCount = count;
}