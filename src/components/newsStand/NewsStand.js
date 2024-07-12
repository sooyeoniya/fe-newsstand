import "./NewsStand.css";
import { mediaButtonEvents } from "./mediaButton/MediaButtonEvents.js";
import { initNewsTabs } from "./NewsStandManager.js";

// 전체 뉴스 스탠드 구조
export default async function NewsStand(elementId) {
  const newsstandElement = document.getElementById(elementId);

  newsstandElement.innerHTML = `
    <nav class="top-menu">
      <div class="top-menu-media">
        <button class="media-total active">전체 언론사</button>
        <button class="media-my">내가 구독한 언론사</button>
      </div>
      <div class="top-menu-view">
        <img src="src/assets/views/listBlue.svg" alt="list" />
        <img src="src/assets/views/gridGray.svg" alt="grid" />
      </div>
    </nav>

    <div class="media-view">
      <div class="media-total-view active">
        <main class="news-stand">
          <nav class="news-tabs"></nav>
          <div class="news-container"></div>
        </main>
      </div>
      <div class="media-my-view">
        <main class="news-stand">
          <nav class="news-tabs"></nav>
          <div class="news-container"></div>
        </main>
      </div>
    </div>
  `;

  mediaButtonEvents();
  await initNewsTabs();
  return newsstandElement;
}