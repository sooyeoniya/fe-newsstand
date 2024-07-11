let currentView = "total";
let currentPage = 1;
let totalPages = 1;
let activeTabIndex = 0;

export function setCurrentView(view) {
  currentView = view;
}

export function getCurrentView() {
  return currentView;
}

export function setCurrentPage(page) {
  currentPage = page;
}

export function getCurrentPage() {
  return currentPage;
}

export function setTotalPages(total) {
  totalPages = total;
}

export function getTotalPages() {
  return totalPages;
}

export function setActiveTabIndex(index) {
  activeTabIndex = index;
}

export function getActiveTabIndex() {
  return activeTabIndex;
}