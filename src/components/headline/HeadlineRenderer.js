import { getTopNews } from "../../apis/NewsAPI.js";

function createRollingList(allNews) {
  return allNews.map(news => `
    <li>
        <span class="company">${news.name}</span>
        <span class="description">
          <a href="${news.url}" target="_blank" rel="noopener noreferrer">${news.description}</a>
        </span>
    </li>`
  ).join("");
}

// 헤드라인 롤링 UI
export default async function renderHeadline(index, headlineItemId) {
  const headlineItem = document.getElementById(headlineItemId);
  const rollingList = headlineItem.querySelector(".rolling");
  const allNews = await getTopNews().then(data => data[index].newsLists);

  rollingList.innerHTML = createRollingList(allNews);

  return rollingList;
}