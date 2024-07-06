import { TAB_NEWS_DATA } from "../../data/tabNewsData.js";

function renderNewsContent() {
  const newsContainer = document.querySelector('.news-container');
  const activeTab = document.querySelector('.news-tabs .tab.active');
  if (!activeTab) return;

  const activeCategory = activeTab.getAttribute('data-tab');
  const { data } = TAB_NEWS_DATA;
  const newsTabs = data[0].newsTabs;
  const activeTabData = newsTabs.find(tab => tab.category === activeCategory);
  if (!activeTabData) return;

  const pageInfo = activeTab.querySelector('.page-info');
  const currentPage = parseInt(pageInfo.textContent.split('/')[0], 10) - 1;
  const newsItem = activeTabData.tabData[currentPage];

  newsContainer.innerHTML = `
    <div class="news-list">
      <article class="news-item">
        <div class="news-meta">
          <img src="${newsItem.sourceLogo}" alt="${newsItem.mediaName} logo" class="news-source">
          <span class="news-date">${newsItem.newsDate} 편집</span>
          <button class="subscribe-button">${newsItem.subscribe === 'Y' ? 'x' : '+ 구독하기'}</button>
        </div>
        <div class="news-content">
          <div class="news-thumbnail">
            <img src="${newsItem.mainNews.thumbnailImage}" alt="뉴스 이미지" class="news-image">
            <div class="news-description">
              <a href="${newsItem.mainNews.url}" target="_blank" rel="noopener noreferrer">${newsItem.mainNews.newsTitle}</a>
            </div>
          </div>
          <div>
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
}

function initNewsContentRenderer() {
  renderNewsContent();
}

export { initNewsContentRenderer };