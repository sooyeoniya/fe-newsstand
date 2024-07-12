let currentView = "total";

// subscribed
let currentPage = 1;
let totalPages = 1;

// total
let activeTabIndex = 0;
let pageCount = 1;

export function getCurrentView() {
  return currentView;
}

export function setCurrentView(view) {
  currentView = view;
}

export function getCurrentPage() {
  return currentPage;
}

export function setCurrentPage(page) {
  currentPage = page;
}

export function getTotalPages() {
  return totalPages;
}

export function setTotalPages(total) {
  totalPages = total;
}

export function getActiveTabIndex() {
  return activeTabIndex;
}

export function setActiveTabIndex(index) {
  activeTabIndex = index;
}

export function getPageCount() {
  return pageCount;
}

export function setPageCount(count) {
  pageCount = count;
}