export const SUBSCRIPTION_STATUS_KEY = "subscriptionStatus";

export function getSubscriptionStatus() {
  return JSON.parse(localStorage.getItem(SUBSCRIPTION_STATUS_KEY)) || {};
}

export function setSubscriptionStatus(status) {
  localStorage.setItem(SUBSCRIPTION_STATUS_KEY, JSON.stringify(status));
}

export function hasSubscriptionStatus() {
  return localStorage.getItem(SUBSCRIPTION_STATUS_KEY) !== null;
}