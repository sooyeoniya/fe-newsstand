import { initSubscriptionStatus } from "../subscription/SubscriptionController.js";
import NewsList from "./NewsList.js";

async function initNewsListRenderer() {
  await initSubscriptionStatus();
  await NewsList();
}

export { initNewsListRenderer };