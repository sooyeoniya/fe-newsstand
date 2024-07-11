import { getTabsNews } from "../../../apis/NewsAPI.js";
import { handleSubscribeStatus } from "../subscription/SubscriptionController.js";

export default class NewsListView {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  async render() {
    const activeTab = this.containerElement.closest(".news-stand").querySelector(".tab.active");
    if (!activeTab) return;

    const activeCategory = activeTab.getAttribute("data-tab");
    try {
      const activeTabData = await getTabsNews(activeCategory);
      if (!activeTabData) return;

      const pageInfo = activeTab.querySelector(".page-info");
      const currentPage = parseInt(pageInfo.textContent.split("/")[0], 10) - 1;
      const newsItem = activeTabData.tabData[currentPage];
      if (!newsItem) return;

      const subscriptionStatus = JSON.parse(localStorage.getItem("subscriptionStatus")) || {};

      if (!subscriptionStatus[newsItem.mediaName]) {
        subscriptionStatus[newsItem.mediaName] = "N";
        localStorage.setItem("subscriptionStatus", JSON.stringify(subscriptionStatus));
      }

      this.containerElement.innerHTML = `
        <div class="news-list">
          <article class="news-item">
            <div class="news-meta">
              <img src="${newsItem.sourceLogo}" alt="${newsItem.mediaName} logo" class="news-source" />
              <span class="news-date">${newsItem.newsDate} 편집</span>
              <button class="subscribe-button" data-media-name="${newsItem.mediaName}">
                ${subscriptionStatus[newsItem.mediaName] === "Y" ? "x" : "+ 구독하기"}
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
                  ${newsItem.subNews.map((subNews) => `
                    <li class="sub-news-headline">
                      <a href="${subNews.url}" target="_blank" rel="noopener noreferrer">${subNews.newsTitle}</a>
                    </li>
                  `).join("")}
                </ul>
                <div class="news-disclaimer">
                  ${newsItem.mediaName} 언론사에서 직접 편집한 뉴스입니다.
                </div>
              </div>
            </div>
          </article>
        </div>
      `;

      const subscribeButton = this.containerElement.querySelector(".subscribe-button");
      subscribeButton.addEventListener("click", handleSubscribeStatus);
    } catch (error) {
      console.error(error);
    }
  }
}