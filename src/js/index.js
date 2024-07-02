/** TEST CODE: 하나의 SVG 파일만을 사용한 색상 변경하는 방법에 대한 JS 코드 */

// SVG 파일을 로드하는 함수
function loadSvg() {
  fetch('assets/mySvg.svg')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      const svgContainer = document.getElementById('svgContainer');
      svgContainer.innerHTML = data;

      // SVG 파일이 로드된 후 이벤트 핸들러 설정
      const svgPath = document.querySelector('.svg-path');
      if (svgPath) {
        svgPath.classList.add('initial-color');
        document.getElementById('changeToGray').addEventListener('click', () => changeColor('#879298'));
        document.getElementById('changeToBlue').addEventListener('click', () => changeColor('#4362D0'));
      } else {
        console.error('SVG path element not found');
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// SVG 색상 변경 함수
function changeColor(color) {
  const svgPath = document.querySelector('.svg-path');
  if (svgPath) {
    svgPath.style.fill = color;
  }
}

// 페이지 로드 시 SVG 파일을 로드
window.onload = loadSvg;
