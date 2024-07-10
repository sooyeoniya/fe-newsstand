
function mediaButtonEvents() {
  const mediaTotalButton = document.querySelector('.media-total');
  const mediaMyButton = document.querySelector('.media-my');
  const mediaTotalView = document.querySelector('.media-total-view');
  const mediaMyView = document.querySelector('.media-my-view');

  mediaTotalButton.addEventListener('click', () => {
    mediaTotalButton.classList.add('active');
    mediaMyButton.classList.remove('active');
    mediaTotalView.classList.add('active');
    mediaMyView.classList.remove('active');
  });

  mediaMyButton.addEventListener('click', () => {
    mediaTotalButton.classList.remove('active');
    mediaMyButton.classList.add('active');
    mediaTotalView.classList.remove('active');
    mediaMyView.classList.add('active');
  });
}

mediaButtonEvents();