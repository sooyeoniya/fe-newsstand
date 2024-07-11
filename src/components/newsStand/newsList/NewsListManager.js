import { initSubscriptionStatus } from "../subscription/SubscriptionController.js";
import NewsListView from "./NewsListView.js";

async function initNewsListRenderer() {
  await initSubscriptionStatus();
  await NewsListView;
}

export { initNewsListRenderer };