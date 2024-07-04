import { TOP_NEWS_DATA } from "../../data/topNewsData.js";

function updateTopNews(idx, topNewsItemId) {
  const topNewsItem = document.getElementById(topNewsItemId);
  const rollingList = topNewsItem.querySelector('.rolling');
  const allNews = TOP_NEWS_DATA.data[0].topNews[idx].newsLists;

  rollingList.innerHTML = '';

  allNews.forEach(news => {
    const li = document.createElement('li');

    const newsName = document.createElement('span');
    newsName.classList.add('company');
    newsName.textContent = news.name;

    const newsDescription = document.createElement('span');
    const newsLink = document.createElement('a');
    newsDescription.classList.add('description');
    newsLink.textContent = news.description;
    newsLink.href = news.url;
    newsLink.target = "_blank";
    newsLink.rel = "noopener noreferrer";
    newsDescription.appendChild(newsLink);

    li.appendChild(newsName);
    li.appendChild(newsDescription);

    rollingList.appendChild(li);
  });

  return rollingList;
}

function startRolling() {
  const rollingList1 = updateTopNews(0, 'top-news-item-1');
  const rollingList2 = updateTopNews(1, 'top-news-item-2');

  function roll(list) {
    const itemHeight = list.children[0].offsetHeight;
    const totalItems = list.children.length;
    let currentIdx = 0;
    let rollingInterval;

    function moveToNext() {
      list.style.transition = 'top 0.5s ease';
      list.style.top = `-${currentIdx * itemHeight}px`;
      currentIdx = (currentIdx + 1) % totalItems;
    }

    function startInterval() {
      rollingInterval = setInterval(() => {
        moveToNext();
      }, 5000);
    }

    list.addEventListener('mouseenter', () => {
      clearInterval(rollingInterval);
    });

    list.addEventListener('mouseleave', () => {
      startInterval();
    });

    moveToNext();
    startInterval();
  }

  roll(rollingList1);
  setTimeout(() => {roll(rollingList2)}, 1000);
}

startRolling();