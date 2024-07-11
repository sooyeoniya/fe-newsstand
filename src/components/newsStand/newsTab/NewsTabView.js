import NewsTab from "./NewsTab.js";

export default class NewsTabView {
  constructor(containerElement, mediaType) {
    this.containerElement = containerElement;
    this.mediaType = mediaType;
  }

  render(newsTabs, tabState) {
    this.containerElement.innerHTML = "";
    newsTabs.forEach((tabData, index) => {
      const tabButton = NewsTab(tabData, index, tabState, this.mediaType);
      this.containerElement.appendChild(tabButton);
    });
  }
}