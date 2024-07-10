import { getTopNews } from "../../apis/NewsAPI.js";

async function renderTopNews(idx, topNewsItemId) {
  const topNewsItem = document.getElementById(topNewsItemId);
  const rollingList = topNewsItem.querySelector('.rolling');
  const allNews = await getTopNews().then(data => data[idx].newsLists);

  rollingList.innerHTML = allNews.map(news => `
   <li>
     <span class="company">${news.name}</span>
     <span class="description">
       <a href="${news.url}" target="_blank" rel="noopener noreferrer">${news.description}</a>
     </span>
   </li>
 `).join('');

  return rollingList;
}

export { renderTopNews };