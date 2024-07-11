
export default function NewsTab(tabData, index, tabState, mediaType) {
  const tabButton = document.createElement('button');
  tabButton.className = `tab ${index === 0 ? 'active' : ''}`;
  tabButton.setAttribute('data-tab', tabData.category);

  tabButton.innerHTML = `
    <span class="page-title">${tabData.tabName}</span>
    ${mediaType === 'total' && index === 0 ? `
      <span class="page-info">${tabState.pageCount}/${tabData.tabData.length}</span>
      <span class="progress-bar"></span>
    ` : ''}
  `;
  return tabButton;
}