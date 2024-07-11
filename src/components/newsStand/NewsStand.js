import NewsStandView from "./NewsStandView.js";
// import { mediaButtonEvents } from "./mediaButton/MediaButtonEvents.js";
// import { initNewsTabs } from "./NewsStandManager.js";

export default function NewsStand(elementId) {
  const newsStandView = new NewsStandView(elementId);
  // mediaButtonEvents();
  // initNewsTabs();
  return newsStandView.newsstandElement;
}