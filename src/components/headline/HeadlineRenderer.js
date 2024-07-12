import { getTopNews } from "../../apis/NewsAPI.js";

export default async function renderHeadline(idx, headlineItemId) {
  const headlineItem = document.getElementById(headlineItemId);
  const rollingList = headlineItem.querySelector(".rolling");
  const allNews = await getTopNews().then(data => data[idx].newsLists);

  rollingList.innerHTML = allNews.map(news => `
   <li>
     <span class="company">${news.name}</span>
     <span class="description">
       <a href="${news.url}" target="_blank" rel="noopener noreferrer">${news.description}</a>
     </span>
   </li>
 `).join("");

  return rollingList;
}