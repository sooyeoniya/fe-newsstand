import { handleSubscribeButtonClick } from "../../subscription/SubscribeButtonControll.js";

const EDIT_TEXT = "편집";
const SUBSCRIBE_TEXT = "+ 구독하기";
const UNSUBSCRIBE_TEXT = "x";
const NEWS_DISCLAIMER_TEXT = "언론사에서 직접 편집한 뉴스입니다.";
const ALT_NEWS_IMAGE = "뉴스 이미지";

function renderNewsMeta(newsItem, subscriptionStatus) {
  return `
    <div class="news-meta">
      <img src="${newsItem.sourceLogo}" alt="${newsItem.mediaName} logo" class="news-source" />
      <span class="news-date">${newsItem.newsDate} ${EDIT_TEXT}</span>
      <button class="subscribe-button" data-media-name="${newsItem.mediaName}">
        ${subscriptionStatus[newsItem.mediaName] === "Y" ? UNSUBSCRIBE_TEXT : SUBSCRIBE_TEXT}
      </button>
    </div>
  `;
}

function renderMainNews(mainNews) {
  return `
    <div class="news-thumbnail">
      <img src="${mainNews.thumbnailImage}" alt="${ALT_NEWS_IMAGE}" class="news-image" />
      <div class="news-description">
        <a href="${mainNews.url}" target="_blank" rel="noopener noreferrer">${mainNews.newsTitle}</a>
      </div>
    </div>
  `;
}

function renderSubNews(subNews) {
  return `
    <ul class="news-headlines">
      ${subNews.map(news => `
        <li class="sub-news-headline">
          <a href="${news.url}" target="_blank" rel="noopener noreferrer">${news.newsTitle}</a>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderNewsContent(newsItem) {
  return `
    <div class="news-main-content">
      ${renderMainNews(newsItem.mainNews)}
      <div class="news-sub-content">
        ${renderSubNews(newsItem.subNews)}
        <div class="news-disclaimer">
          ${newsItem.mediaName} ${NEWS_DISCLAIMER_TEXT}
        </div>
      </div>
    </div>
  `;
}

function addSubscribeButtonListener(newsContainer) {
  const subscribeButton = newsContainer.querySelector(".subscribe-button");
  subscribeButton.addEventListener("click", handleSubscribeButtonClick);
}

// 뉴스 리스트 공통 UI
export function renderNewsItem(newsContainer, newsItem, subscriptionStatus) {
  newsContainer.innerHTML = `
    <div class="news-list">
      <article class="news-item">
        ${renderNewsMeta(newsItem, subscriptionStatus)}
        ${renderNewsContent(newsItem)}
      </article>
    </div>
  `;

  addSubscribeButtonListener(newsContainer);
}
