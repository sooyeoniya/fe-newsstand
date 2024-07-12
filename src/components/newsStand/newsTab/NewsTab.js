import { getTotalPageCount } from "../../state/StateManager.js";

export default function NewsTab(tabData, index) {
  const tabButton = document.createElement("button");
  tabButton.className = `tab ${index === 0 ? "active" : ""}`;
  tabButton.setAttribute("data-tab", tabData.category);

  const pageCount = getTotalPageCount();

  tabButton.innerHTML = `
    <span class="page-title">${tabData.tabName}</span>
    ${index === 0 ? `
      <span class="page-info">${pageCount}/${tabData.tabData.length}</span>
      <span class="progress-bar"></span>
    ` : ""}
  `;
  return tabButton;
}