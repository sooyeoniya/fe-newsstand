import { initSubscriptionStatus } from "../../subscription/SubscriptionManager.js";
import TotalNewsList from "./TotalNewsList.js";
import SubscribedNewsList from "./SubscribedNewsList.js";

// 뉴스 리스트
async function initNewsListRenderer() {
  if (!localStorage.getItem("subscriptionStatus")) {
    await initSubscriptionStatus();
  }

  await TotalNewsList();
  await SubscribedNewsList();
}

export { initNewsListRenderer };