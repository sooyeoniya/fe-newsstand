import { initSubscriptionStatus } from "../../subscription/SubscriptionManager.js";
import TotalNewsList from "./TotalNewsList.js";
import SubscribedNewsList from "./SubscribedNewsList.js";
import { getCurrentView } from "../../state/StateManager.js";

async function initNewsListRenderer() {
  if (!localStorage.getItem('subscriptionStatus')) {
    await initSubscriptionStatus();
  }

  await TotalNewsList();
  await SubscribedNewsList();

  // const currentView = getCurrentView();
  // if (currentView === 'total') {
  //   await TotalNewsList();
  // } else if (currentView === 'subscribed') {
  //   await SubscribedNewsList();
  // }
}

export { initNewsListRenderer };