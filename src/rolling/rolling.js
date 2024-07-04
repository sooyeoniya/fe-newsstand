import { TOP_NEWS_DATA } from "../data/topNewsData.js";

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

  // FIXME: 롤링 오류 수정 (시작할 때, length 까지 전부 롤링 후 다시 첫 번째 기사로 넘어갈 때)
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