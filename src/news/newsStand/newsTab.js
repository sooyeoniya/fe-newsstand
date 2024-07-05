import { TAB_NEWS_DATA } from "../../data/tabNewsData.js";

function updateTabCategory() {
  document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.news-tabs');
    const { data } = TAB_NEWS_DATA;
    const newsTabs = data[0].newsTabs;
    const count = 1;

    function createTabButton(tabData, index) {
      const tabLength = tabData.length || tabData.tabData.length;
      const tabButton = document.createElement('button');
      tabButton.className = `tab ${index === 0 ? 'active' : ''}`; // 우선 index 0번째만 active 처리
      const dataTab = tabData.category || tabData.tabName.toLowerCase().replace(/\//g, '-');
      tabButton.setAttribute('data-tab', dataTab);

      tabButton.innerHTML = `
        <span class="page-title">${tabData.tabName}</span>
        ${index === 0 ? `
          <span class="page-info">1/${tabData.length}</span>
          <span class="progress-bar"></span>
        ` : ''}
      `;

      return tabButton;
    }

    newsTabs.forEach((tabData, index) => {
      const tabButton = createTabButton(tabData, index);
      tabsContainer.appendChild(tabButton);
    });

    function updateTabContent(tab, tabData) {
      if (!tab.querySelector('.page-info')) {
        tab.insertAdjacentHTML('beforeend', `
          <span class="page-info">1/${tabData.length}</span>
          <span class="progress-bar"></span>
        `);
      }
    }

    function removeTabContent(tab) {
      const pageInfo = tab.querySelector('.page-info');
      const progressBar = tab.querySelector('.progress-bar');
      if (pageInfo) pageInfo.remove();
      if (progressBar) progressBar.remove();
    }

    tabsContainer.addEventListener('click', (event) => {
      const clickedTab = event.target.closest('.tab');
      if (!clickedTab) return;

      const tabs = tabsContainer.querySelectorAll('.tab');
      tabs.forEach((tab, index) => {
        if (tab === clickedTab) {
          tab.classList.add('active');
          updateTabContent(tab, newsTabs[index]);
        } else {
          tab.classList.remove('active');
          removeTabContent(tab);
        }
      });
    });
  });
}

updateTabCategory();