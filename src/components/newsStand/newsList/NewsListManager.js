import { initSubscriptionStatus } from "../../subscription/SubscriptionManager.js";
import TotalNewsList from "./TotalNewsList.js";
import SubscribedNewsList from "./SubscribedNewsList.js";
import { hasSubscriptionStatus } from "../../../helpers/subscriptionHelpers.js";

async function ensureSubscriptionStatus() {
  if (!hasSubscriptionStatus()) {
    await initSubscriptionStatus();
  }
}

async function renderNewsList() {
  await Promise.all([
    TotalNewsList(),
    SubscribedNewsList()
  ]);
}

// 뉴스 리스트 초기화
async function initNewsListRenderer() {
  try {
    await ensureSubscriptionStatus();
    await renderNewsList();
  } catch (error) {
    console.error(error);
  }
}

export { initNewsListRenderer };