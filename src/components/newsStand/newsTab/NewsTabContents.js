import { getTotalActiveTabIndex, getTotalPageCount } from "../../state/StateManager.js";

function updatePageInfo(pageInfo, pageCount, totalPageCount) {
  pageInfo.textContent = `${pageCount}/${totalPageCount}`;
}

function contentTemplate(pageCount, totalPageCount) {
  return `
    <span class="page-info">${pageCount}/${totalPageCount}</span>
    <span class="progress-bar"></span>
  `;
}

function addTabContent(tab, pageCount, totalPageCount) {
  tab.insertAdjacentHTML("beforeend", contentTemplate(pageCount, totalPageCount));
}

function removeElement(element) {
  if (element) element.remove();
}

// 활성화 탭 UI
function updateTabContent(tab, newsTabs) {
  const activeTabIndex = getTotalActiveTabIndex();
  const tabData = newsTabs[activeTabIndex];
  const pageCount = getTotalPageCount();
  const totalPageCount = tabData.tabData.length;

  const pageInfo = tab.querySelector(".page-info");
  if (pageInfo) updatePageInfo(pageInfo, pageCount, totalPageCount);
  else addTabContent(tab, pageCount, totalPageCount);
}

// 비활성화 탭 UI
function removeTabContent(tab) {
  removeElement(tab.querySelector(".page-info"));
  removeElement(tab.querySelector(".progress-bar"));
}

export { updateTabContent, removeTabContent };