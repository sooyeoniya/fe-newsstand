import { TAB_NEWS_DATA } from "../../data/tabNewsData.js";
import { initNewsContentRenderer } from "./newsList.js";

function updateTabCategory() {
  document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.news-tabs');
    const { data } = TAB_NEWS_DATA;
    const newsTabs = data[0].newsTabs;
    let count = 1;

    function createTabButton(tabData, index) {
      const tabButton = document.createElement('button');
      tabButton.className = `tab ${index === 0 ? 'active' : ''}`;
      const dataTab = tabData.category;
      tabButton.setAttribute('data-tab', dataTab);

      tabButton.innerHTML = `
        <span class="page-title">${tabData.tabName}</span>
        ${index === 0 ? `
          <span class="page-info">${count}/${tabData.length}</span>
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
          <span class="page-info">${count}/${tabData.length}</span>
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

    function animationProgressBar(tab) {
      const progressBar = tab.querySelector('.progress-bar');
      if (progressBar) {
        progressBar.style.width = '0%';
        const totalDuration = 2000;
        const startTime = performance.now();

        function animate() {
          const currentTime = performance.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(1, elapsed / totalDuration);

          progressBar.style.width = `${progress * 100}%`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            const tabs = tabsContainer.querySelectorAll('.tab');
            const activeTabIndex = Array.from(tabs).indexOf(tab);
            const nextTabIndex = (activeTabIndex + 1) % tabs.length;

            count = count + 1 > newsTabs[activeTabIndex].length ? 1 : count + 1;

            const pageInfo = tab.querySelector('.page-info');
            const tabData = newsTabs[activeTabIndex];
            if (pageInfo && tabData) pageInfo.textContent = `${count}/${tabData.length}`;

            if (count === 1) {
              tabs.forEach((tab, index) => {
                if (index === nextTabIndex) {
                  tab.classList.add('active');
                  updateTabContent(tab, newsTabs[index]);
                  animationProgressBar(tab);
                  initNewsContentRenderer();
                } else {
                  tab.classList.remove('active');
                  removeTabContent(tab);
                }
              });
            } else {
              animationProgressBar(tab);
            }
          }
        }
        requestAnimationFrame(animate);
      }
    }

    tabsContainer.addEventListener('click', (event) => {
      const clickedTab = event.target.closest('.tab');
      if (!clickedTab) return;

      const tabs = tabsContainer.querySelectorAll('.tab');
      tabs.forEach((tab, index) => {
        if (tab === clickedTab) {
          tab.classList.add('active');
          updateTabContent(tab, newsTabs[index]);
          animationProgressBar(tab);
        } else {
          tab.classList.remove('active');
          removeTabContent(tab);
        }
      });
    });

    const initialActiveTab = tabsContainer.querySelector('.tab.active');
    if (initialActiveTab) animationProgressBar(initialActiveTab);
    initNewsContentRenderer();
  });
}

updateTabCategory();