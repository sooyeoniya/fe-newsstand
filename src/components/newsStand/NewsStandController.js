import { getTabsNews } from "../../apis/NewsAPI.js";
import NewsListView from "./newsList/NewsListView.js";
import NewsTabView from "./newsTab/NewsTabView.js";
import NewsStandModel from "./NewsStandModel.js";

export default class NewsStandController {
  constructor(newsStandView) {
    this.newsStandView = newsStandView;
    this.model = NewsStandModel;
    this.initEvents();
    this.renderTabs();
  }

  initEvents() {
    this.newsStandView.mediaTotalButton.addEventListener("click", () => {
      this.model.setMediaType("total");
      this.render();
    });

    this.newsStandView.mediaMyButton.addEventListener("click", () => {
      this.model.setMediaType("my");
      this.render();
    });

    this.newsStandView.totalNewsTabs.addEventListener("click", this.handleTabClick.bind(this));
    this.newsStandView.myNewsTabs.addEventListener("click", this.handleTabClick.bind(this));
  }

  async render() {
    const mediaType = this.model.getMediaType();

    if (mediaType === "total") {
      await this.newsStandView.renderTotalNews();
    } else if (mediaType === "my") {
      await this.newsStandView.renderMyNews();
    }
  }

  async handleTabClick(event) {
    const clickedTab = event.target.closest(".tab");
    if (!clickedTab) return;

    const mediaType = this.model.getMediaType();
    const tabsContainer = mediaType === "total" ? this.newsStandView.totalNewsTabs : this.newsStandView.myNewsTabs;
    const newsContainer = mediaType === "total" ? this.newsStandView.totalNewsContainer : this.newsStandView.myNewsContainer;

    const tabs = tabsContainer.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      if (tab === clickedTab) {
        tab.classList.add("active");
        this.renderNewsList(newsContainer, tab.getAttribute("data-tab"));
      } else {
        tab.classList.remove("active");
      }
    });
  }

  async renderTabs() {
    const mediaType = this.model.getMediaType();
    const tabsContainer = mediaType === "total" ? this.newsStandView.totalNewsTabs : this.newsStandView.myNewsTabs;
    const tabState = { pageCount: 1 };

    try {
      const newsTabs = await getTabsNews();
      const filteredTabs = mediaType === "my" ? this.filterSubscribedTabs(newsTabs) : newsTabs;
      const newsTabView = new NewsTabView(tabsContainer, mediaType);
      newsTabView.render(filteredTabs, tabState);

      const activeTab = tabsContainer.querySelector(".tab");
      if (activeTab) {
        activeTab.classList.add("active");
        await this.renderNewsList(mediaType === "total" ? this.newsStandView.totalNewsContainer : this.newsStandView.myNewsContainer, activeTab.getAttribute("data-tab"));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async renderNewsList(newsContainer, category) {
    const newsListView = new NewsListView(newsContainer);
    await newsListView.render(category);
  }

  filterSubscribedTabs(newsTabs) {
    const subscriptionStatus = JSON.parse(localStorage.getItem("subscriptionStatus")) || {};
    return newsTabs.map((tab) => {
      const filteredTabData = tab.tabData.filter((newsItem) => subscriptionStatus[newsItem.mediaName] === "Y");
      return { ...tab, tabData: filteredTabData };
    });
  }
}