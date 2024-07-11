import "./NewsStand.css";
import NewsListView from "./newsList/NewsListView.js";
import NewsTabView from "./newsTab/NewsTabView.js";
import NewsStandController from "./NewsStandController.js";

export default class NewsStandView {
  constructor(elementId) {
    this.newsstandElement = document.getElementById(elementId);
    this.renderView();
    this.initElements();
    this.initController();
  }

  renderView() {
    this.newsstandElement.innerHTML = `
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
            <nav class="total-news-tabs"></nav>
            <div class="total-news-container"></div>
          </main>
        </div>
        <div class="media-my-view">
          <main class="news-stand">
            <nav class="my-news-tabs"></nav>
            <div class="my-news-container"></div>
          </main>
        </div>
      </div>
    `;
  }

  initElements() {
    this.mediaTotalButton = this.newsstandElement.querySelector(".media-total");
    this.mediaMyButton = this.newsstandElement.querySelector(".media-my");
    this.totalNewsContainer = this.newsstandElement.querySelector(".total-news-container");
    this.totalNewsTabs = this.newsstandElement.querySelector(".total-news-tabs");
    this.myNewsContainer = this.newsstandElement.querySelector(".my-news-container");
    this.myNewsTabs = this.newsstandElement.querySelector(".my-news-tabs");
  }

  initController() {
    this.controller = new NewsStandController(this);
  }

  async renderTotalNews() {
    const totalNewsListView = new NewsListView(this.totalNewsContainer);
    const totalNewsTabView = new NewsTabView(this.totalNewsTabs, "total");
    await totalNewsListView.render();
    await totalNewsTabView.render();
  }

  async renderMyNews() {
    const myNewsListView = new NewsListView(this.myNewsContainer);
    const myNewsTabView = new NewsTabView(this.myNewsTabs, "my");
    await myNewsListView.render();
    await myNewsTabView.render();
  }
}