import { getTotalPageCount } from "../../state/StateManager.js";

function createTabButton(category, isActive) {
  const tabButton = document.createElement("button");
  tabButton.className = `tab ${isActive ? "active" : ""}`;
  tabButton.setAttribute("data-tab", category);

  return tabButton;
}

function createTabContent(tabName, tabDataLength, isActive) {
  const pageCount = getTotalPageCount();

  return `
    <span class="page-title">${tabName}</span>
    ${isActive ? `
      <span class="page-info">${pageCount}/${tabDataLength}</span>
      <span class="progress-bar"></span>
    ` : ""}
  `;
}

// 카테고리 탭 UI
export default function NewsTab(tabData, index) {
  const isActive = index === 0;
  const tabButton = createTabButton(tabData.category, isActive);
  tabButton.innerHTML = createTabContent(tabData.tabName, tabData.tabData.length, isActive);

  return tabButton;
}