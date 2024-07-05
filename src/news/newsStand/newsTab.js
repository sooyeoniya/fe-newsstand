import { TAB_NEWS_DATA } from "../../data/tabNewsData.js";

function updateTabCategory() {
  document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.news-tabs');
    const { data } = TAB_NEWS_DATA;
    const newsTabs = data[0].newsTabs;
    let count = 1;

    function createTabButton(tabData, index) {
      const tabButton = document.createElement('button');
      tabButton.className = `tab ${index === 0 ? 'active' : ''}`; // 우선 index 0번째만 active 처리
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

    // 이전 코드 -> width를 1씩 더해주니까 애니메이션이 너무 끊겨서 안예쁨.. 더 잘게 쪼개야 할 것 같다.
    // function animationProgressBar(tab) {
    //   const progressBar = tab.querySelector('.progress-bar');
    //   if (progressBar) {
    //     progressBar.style.width = '0%';
    //     let widthPercentage = 0;
    //     const interval = setInterval(() => {
    //       if (widthPercentage >= 100) {
    //         clearInterval(interval);
    //         count++;
    //         const pageInfo = tab.querySelector('.page-info');
    //         const tabData = newsTabs.find(data => data.category === tab.getAttribute('data-tab'));
    //         if (pageInfo && tabData) {
    //           pageInfo.textContent = `${count}/${tabData.length}`;
    //         }
    //         animationProgressBar(tab);
    //       } else {
    //         widthPercentage++;
    //         progressBar.style.width = widthPercentage + '%';
    //       }
    //     }, 20);
    //   }
    // }

    // setInterval() 대신 requestAnimationFrame() 사용
    // performance.now(): 시스템 클럭에 기반하여 정밀하게 시간 측정
    function animationProgressBar(tab) {
      const progressBar = tab.querySelector('.progress-bar');
      if (progressBar) {
        progressBar.style.width = '0%';
        const totalDuration = 2000; // 임시로 2초 (20초로 변경 필요)
        const startTime = performance.now();

        function animate() {
          const currentTime = performance.now();
          const elapsed = currentTime - startTime; // 진행률
          const progress = Math.min(1, elapsed / totalDuration); // 최대 1로 계산

          progressBar.style.width = `${progress * 100}%`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else { // 게이지 다 차면
            count++;
            const pageInfo = tab.querySelector('.page-info');
            const tabData = newsTabs.find(data => data.category === tab.getAttribute('data-tab'));
            if (pageInfo && tabData) {
              pageInfo.textContent = `${count}/${tabData.length}`;
            }
            animationProgressBar(tab);
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
          // count = 1;
          animationProgressBar(tab);
        } else {
          tab.classList.remove('active');
          removeTabContent(tab);
        }
      });
    });

    // 처음 선택
    const initialActiveTab = tabsContainer.querySelector('.tab.active');
      if (initialActiveTab) {
        animationProgressBar(initialActiveTab);
    }
  });
}

updateTabCategory();