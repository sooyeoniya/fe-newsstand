import { initNewsListRenderer } from "../newsList/NewsListManager.js";
import { updateTabContent, removeTabContent } from "./NewsTabContents.js";
import {
  getTotalActiveTabIndex,
  setTotalActiveTabIndex,
  getTotalPageCount,
  setTotalPageCount,
  getTabsContainer
} from "../../state/StateManager.js";
import { ANIMATION_DURATION } from "../../../constants/constants.js";

// 카테고리 탭 프로그래스바 애니메이션 기능
function animateProgressBar(tab, newsTabs) {
  const tabsContainer = getTabsContainer();
  const progressBar = tab.querySelector(".progress-bar");
  if (progressBar) {
    progressBar.style.width = "0%";
    const totalDuration = ANIMATION_DURATION;
    const startTime = performance.now();

    let animationId = null;

    function animate() {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / totalDuration);

      progressBar.style.width = `${progress * 100}%`;

      if (progress < 1) {
        // 현재 애니메이션 계속 진행, 애니메이션이 완료되지 않은 경우 다음 프레임 요청
        animationId = requestAnimationFrame(animate);
        tab.dataset.animationId = animationId.toString();
      } else {
        // 1번의 애니메이션 완료 후 다음 언론사 페이지 또는 카테고리 탭 넘김 처리
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
              animateProgressBar(tab, newsTabs);
            } else {
              tab.classList.remove("active");
              removeTabContent(tab);
            }
          });
        } else {
          animateProgressBar(tab, newsTabs);
        }
        initNewsListRenderer();
      }
    }

    // 애니메이션 시작 및 탭 요소에 애니메이션 ID 저장
    animationId = requestAnimationFrame(animate);
    tab.dataset.animationId = animationId.toString();

    // 애니메이션 취소 및 해당 탭 요소에 애니메이션 ID 삭제
    tabsContainer.addEventListener("click", (event) => {
      if (animationId || (animationId && !event.target.closest(".tab"))) {
        cancelAnimationFrame(animationId);
        delete tab.dataset.animationId;
      }
    });
  }
}

export { animateProgressBar };