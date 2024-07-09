import { getNewsData } from "../../api/NewsAPI.js";

function showToast(message) {
  const container = document.querySelector('.container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    }, { once: true });
  }, 5000);
}

function showConfirmation(mediaName) {
  return new Promise((resolve) => {
    const container = document.querySelector('.container');
    const confirmation = document.createElement('div');
    confirmation.className = 'confirmation';
    confirmation.innerHTML = `
      <div class="confirm-text">
        <span class="confirm-media">${mediaName}</span>
        <span class="confirm-description">을(를)</br>구독해지하시겠습니까?</span>
      </div>
      <div class="confirm-select">
        <div><button class="confirm-yes">예, 해지합니다</button></div>
        <div><button class="confirm-no">아니오</button></div>
      </div>
    `;
    container.appendChild(confirmation);

    const confirmYesButton = confirmation.querySelector('.confirm-yes');
    const confirmNoButton = confirmation.querySelector('.confirm-no');

    confirmYesButton.addEventListener('click', () => {
      confirmation.remove();
      resolve(true);
    });

    confirmNoButton.addEventListener('click', () => {
      confirmation.remove();
      resolve(false);
    });
  });
}

async function handleSubscribeButtonClick(event) {
  const subscribeButton = event.target;
  const mediaName = subscribeButton.dataset.mediaName;
  const subscriptionStatus = JSON.parse(localStorage.getItem('subscriptionStatus'));

  if (subscriptionStatus[mediaName] === 'N') {
    subscriptionStatus[mediaName] = 'Y';
    subscribeButton.textContent = 'x';
    showToast('내가 구독한 언론사에 추가되었습니다.');
  } else {
    const confirmed = await showConfirmation(mediaName);
    if (confirmed) {
      subscriptionStatus[mediaName] = 'N';
      subscribeButton.textContent = '+ 구독하기';
    }
  }

  localStorage.setItem('subscriptionStatus', JSON.stringify(subscriptionStatus));
}

async function renderNewsContent() {
  const newsContainer = document.querySelector('.news-container');
  const activeTab = document.querySelector('.news-tabs .tab.active');
  if (!activeTab) return;

  const activeCategory = activeTab.getAttribute('data-tab');

  try {
    const activeTabData = await getNewsData().then(newsTabs => newsTabs[0].newsTabs.find(tab => tab.category === activeCategory));
    if (!activeTabData) return;

    const pageInfo = activeTab.querySelector('.page-info');
    const currentPage = parseInt(pageInfo.textContent.split('/')[0], 10) - 1;
    const newsItem = activeTabData.tabData[currentPage];

    const subscriptionStatus = JSON.parse(localStorage.getItem('subscriptionStatus'));

    newsContainer.innerHTML = `
      <div class="news-list">
        <article class="news-item">
          <div class="news-meta">
            <img src="${newsItem.sourceLogo}" alt="${newsItem.mediaName} logo" class="news-source" />
            <span class="news-date">${newsItem.newsDate} 편집</span>
            <button class="subscribe-button" data-media-name="${newsItem.mediaName}">
              ${subscriptionStatus[newsItem.mediaName] === 'Y' ? 'x' : '+ 구독하기'}
            </button>
          </div>
          <div class="news-main-content">
            <div class="news-thumbnail">
              <img src="${newsItem.mainNews.thumbnailImage}" alt="뉴스 이미지" class="news-image" />
              <div class="news-description">
                <a href="${newsItem.mainNews.url}" target="_blank" rel="noopener noreferrer">${newsItem.mainNews.newsTitle}</a>
              </div>
            </div>
            <div class="news-sub-content">
              <ul class="news-headlines">
                ${newsItem.subNews.map(subNews => `
                  <li class="headline">
                    <a href="${subNews.url}" target="_blank" rel="noopener noreferrer">${subNews.newsTitle}</a>
                  </li>
                `).join('')}
              </ul>
              <div class="news-disclaimer">
                ${newsItem.mediaName} 언론사에서 직접 편집한 뉴스입니다.
              </div>
            </div>
          </div>
        </article>
      </div>
    `;

    const subscribeButton = newsContainer.querySelector('.subscribe-button');
    subscribeButton.addEventListener('click', handleSubscribeButtonClick);
  } catch (error) {
    console.error(error);
  }
}

function initNewsContentRenderer() {
  renderNewsContent();
}

export { initNewsContentRenderer };