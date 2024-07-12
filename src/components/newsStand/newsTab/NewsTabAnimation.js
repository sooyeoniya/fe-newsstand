import { initNewsListRenderer } from "../newsList/NewsListManager.js";
import { updateTabContent, removeTabContent } from "./NewsTabContents.js";
import { getTotalActiveTabIndex, setTotalActiveTabIndex, getTotalPageCount, setTotalPageCount } from "../../state/StateManager.js";

function animateProgressBar(tab, tabsContainer, newsTabs) {
  const progressBar = tab.querySelector(".progress-bar");
  if (progressBar) {
    progressBar.style.width = "0%";
    const totalDuration = 5000;
    const startTime = performance.now();

    let animationId = null;

    function animate() {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / totalDuration);

      progressBar.style.width = `${progress * 100}%`;

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
        tab.dataset.animationId = animationId.toString();
      } else {
        const tabs = tabsContainer.querySelectorAll(".tab");
        const activeTabIndex = getTotalActiveTabIndex();
        const nextTabIndex = (activeTabIndex + 1) % tabs.length;

        setTotalPageCount(getTotalPageCount() + 1);

        const pageInfo = tab.querySelector(".page-info");
        const tabData = newsTabs[activeTabIndex];
        if (pageInfo && tabData) pageInfo.textContent = `${getTotalPageCount()}/${tabData.tabData.length}`;

        if (getTotalPageCount() > tabData.tabData.length) {
          setTotalActiveTabIndex(nextTabIndex);
          setTotalPageCount(1);

          tabs.forEach((tab, index) => {
            if (index === nextTabIndex) {
              tab.classList.add("active");
              updateTabContent(tab, newsTabs);
              animateProgressBar(tab, tabsContainer, newsTabs);
            } else {
              tab.classList.remove("active");
              removeTabContent(tab);
            }
          });
        } else {
          animateProgressBar(tab, tabsContainer, newsTabs);
        }
        initNewsListRenderer();
      }
    }

    animationId = requestAnimationFrame(animate);
    tab.dataset.animationId = animationId.toString();

    tabsContainer.addEventListener("click", (event) => {
      if (animationId || (animationId && !event.target.closest(".tab"))) {
        cancelAnimationFrame(animationId);
        delete tab.dataset.animationId;
      }
    });
  }
}

export { animateProgressBar };