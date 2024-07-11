
function updateTabContent(tab, newsTabs, tabState) {
  const tabData = newsTabs[tabState.activeTabIndex];
  const pageInfo = tab.querySelector(".page-info");
  if (pageInfo) {
    pageInfo.textContent = `${tabState.pageCount}/${tabData.tabData.length}`;
  } else {
    tab.insertAdjacentHTML("beforeend", `
    <span class="page-info">${tabState.pageCount}/${tabData.tabData.length}</span>
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