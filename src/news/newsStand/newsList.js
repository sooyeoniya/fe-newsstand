import { getTabsNews } from "../../apis/NewsAPI.js";
import { renderToast } from "../../components/alerts/ToastMessage.js";
import { renderNotification } from "../../components/alerts/Notification.js";

async function initializeSubscriptionStatus() {
  const subscriptionStatus = {};
  try {
    const newsTabs = await getTabsNews();
    newsTabs.forEach(tab => {
      tab.tabData.forEach(newsItem => {
        subscriptionStatus[newsItem.mediaName] = 'N';
      });
    });
    localStorage.setItem('subscriptionStatus', JSON.stringify(subscriptionStatus));
  } catch (error) {
    console.error(error);
  }
}

async function handleSubscribeButtonClick(event) {
  const subscribeButton = event.target;
  const mediaName = subscribeButton.dataset.mediaName;
  const subscriptionStatus = JSON.parse(localStorage.getItem('subscriptionStatus'));

  if (subscriptionStatus[mediaName] === 'N') {
    subscriptionStatus[mediaName] = 'Y';
    subscribeButton.textContent = 'x';
    renderToast('내가 구독한 언론사에 추가되었습니다.');
  } else {
    const confirmed = await renderNotification(mediaName);
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
    const activeTabData = await getTabsNews(activeCategory);
    if (!activeTabData) return;

    const pageInfo = activeTab.querySelector('.page-info');
    const currentPage = parseInt(pageInfo.textContent.split('/')[0], 10) - 1;
    const newsItem = activeTabData.tabData[currentPage];
    if (!newsItem) return;

    const subscriptionStatus = JSON.parse(localStorage.getItem('subscriptionStatus')) || {};

    if (!subscriptionStatus[newsItem.mediaName]) {
      subscriptionStatus[newsItem.mediaName] = 'N';
      localStorage.setItem('subscriptionStatus', JSON.stringify(subscriptionStatus));
    }

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
                  <li class="sub-news-headline">
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

async function initNewsContentRenderer() {
  if (!localStorage.getItem('subscriptionStatus')) {
    await initializeSubscriptionStatus();
  }
  renderNewsContent();
}

export { initNewsContentRenderer };