import { initSubscriptionStatus } from "../../subscription/SubscriptionManager.js";
import TotalNewsList from "./TotalNewsList.js";

async function initNewsListRenderer() {
  if (!localStorage.getItem('subscriptionStatus')) {
    await initSubscriptionStatus();
  }
  await TotalNewsList();
}

export { initNewsListRenderer };