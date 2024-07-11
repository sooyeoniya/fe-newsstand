import { getTabsNews } from "../../../apis/NewsAPI.js";

class SubscriptionModel {
  constructor() {
    this.subscriptions = JSON.parse(localStorage.getItem('subscriptionStatus')) || {};
  }

  async initDefaultSubscriptions() {
    const newsTabs = await getTabsNews();
    newsTabs.forEach(tab => {
      tab.tabData.forEach(newsItem => {
        this.subscriptions[newsItem.mediaName] = 'N';
      });
    });
    localStorage.setItem('subscriptionStatus', JSON.stringify(this.subscriptions));
  }

  setSubscription(mediaName, status) {
    this.subscriptions[mediaName] = status;
    localStorage.setItem('subscriptionStatus', JSON.stringify(this.subscriptions));
  }

  getSubscription(mediaName) {
    return this.subscriptions[mediaName];
  }

  addSubscription(mediaName) {
    this.setSubscription(mediaName, 'Y');
  }

  removeSubscription(mediaName) {
    this.setSubscription(mediaName, 'N');
  }

  isSubscribed(mediaName) {
    return this.getSubscription(mediaName) === 'Y';
  }
}

export default new SubscriptionModel();