import { initSubscriptionStatus } from "../../subscription/SubscriptionManager.js";
import NewsList from "./NewsList.js";

async function initNewsListRenderer() {
  if (!localStorage.getItem('subscriptionStatus')) {
    await initSubscriptionStatus();
  }
  await NewsList();
}

export { initNewsListRenderer };