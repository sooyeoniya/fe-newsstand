let currentView = "total";

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