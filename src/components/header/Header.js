import { formatDate } from "../../utils/DateUtils.js";
import "./Header.css";

function createHeaderElement() {
  return `
    <div class="header-logo">
      <img src="src/assets/favicon.svg" alt="뉴스스탠드" />
      <p>뉴스스탠드</p>
    </div>
    <div class="header-date"></div>
  `;
}

function updateHeaderDate(headerElement) {
  const headerDate = headerElement.querySelector(".header-date");
  headerDate.textContent = formatDate();
}

// 헤더 UI
export default function Header(elementId) {
  const headerElement = document.getElementById(elementId);
  headerElement.innerHTML = createHeaderElement();
  updateHeaderDate(headerElement);
  return headerElement;
}