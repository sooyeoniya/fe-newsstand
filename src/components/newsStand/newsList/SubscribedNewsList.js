import { getTabsNews } from "../../../apis/NewsAPI.js";
import { handleSubscribeButtonClick } from "../../subscription/SubscribeButtonControll.js";
import { setTotalPages, setCurrentPage, getCurrentPage } from "../../state/StateManager.js";

export default async function SubscribedNewsList() {
  const newsContainer = document.querySelector('.media-my-view .news-container');
  const subscriptionStatus = JSON.parse(localStorage.getItem('subscriptionStatus')) || {};

  const subscribedMediaNames = Object.keys(subscriptionStatus).filter(
    mediaName => subscriptionStatus[mediaName] === 'Y'
  );

  if (subscribedMediaNames.length === 0) {
    newsContainer.innerHTML = '<p class="no-subscribe">구독한 언론사가 없습니다.</p>';
    return;
  }

  try {
    const newsTabs = await getTabsNews();
    const filteredNewsItems = newsTabs.flatMap(tab =>
      tab.tabData.filter(newsItem => subscribedMediaNames.includes(newsItem.mediaName))
    );

    if (filteredNewsItems.length === 0) {
      newsContainer.innerHTML = '<p class="no-subscribe">구독한 언론사가 없습니다.</p>';
      return;
    }

    setTotalPages(filteredNewsItems.length);
    const currentPage = getCurrentPage() || 1;
    const newsItem = filteredNewsItems[currentPage - 1];

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