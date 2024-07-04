import { TOP_NEWS_DATA } from "../data/topNewsData.js";

function updateTopNews(idx, topNewsItemId) {
  const topNewsItem = document.getElementById(topNewsItemId);
  const rollingList = topNewsItem.querySelector('.rolling');
  const allNews = TOP_NEWS_DATA.data[0].topNews[idx].newsLists;

  rollingList.innerHTML = '';

  allNews.forEach(news => {
    const li = document.createElement('li');
    const content = document.createElement('div');
    content.classList.add('content');

    const newsName = document.createElement('div');
    newsName.classList.add('company');
    newsName.textContent = news.name;

    const newsDescription = document.createElement('div');
    newsDescription.classList.add('description');
    newsDescription.textContent = news.description;

    content.appendChild(newsName);
    content.appendChild(newsDescription);
    li.appendChild(content);
    rollingList.appendChild(li);
  });

  return rollingList;
}

function startRolling() {
  const rollingList1 = updateTopNews(0, 'top-news-item-1');
  const rollingList2 = updateTopNews(1, 'top-news-item-2');

  function roll(list) {
    const itemHeight = list.children[0].offsetHeight;
    let currentIndex = 0;

    function moveToNext() {
      currentIndex = (currentIndex + 1) % list.children.length;
      list.style.transition = 'top 0.5s ease';
      list.style.top = `-${currentIndex * itemHeight}px`;

      setTimeout(() => {
        if (currentIndex === list.children.length - 1) {
          list.style.transition = 'none';
          list.style.top = '0px';
          currentIndex = 0;
        }
        setTimeout(moveToNext, 5000);
      }, 500);
    }

    setTimeout(moveToNext, 5000);
  }

  roll(rollingList1);
  roll(rollingList2);
}

startRolling();