import { getActiveTabIndex, getPageCount } from "../../state/StateManager.js";

function updateTabContent(tab, newsTabs) {
  const activeTabIndex = getActiveTabIndex();
  const tabData = newsTabs[activeTabIndex];
  const pageCount = getPageCount();
  const pageInfo = tab.querySelector(".page-info");
  if (pageInfo) {
    pageInfo.textContent = `${pageCount}/${tabData.tabData.length}`;
  } else {
    tab.insertAdjacentHTML("beforeend", `
    <span class="page-info">${pageCount}/${tabData.tabData.length}</span>
    <span class="progress-bar"></span>
  `);
  }
}

function removeTabContent(tab) {
  const pageInfo = tab.querySelector(".page-info");
  const progressBar = tab.querySelector(".progress-bar");
  if (pageInfo) pageInfo.remove();
  if (progressBar) progressBar.remove();
}

export { updateTabContent, removeTabContent };