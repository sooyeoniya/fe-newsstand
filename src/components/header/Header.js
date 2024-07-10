import { formatDate } from "../../utils/dateUtils.js";
import "./Header.css";

export default function Header(elementId) {
  const headerElement = document.getElementById(elementId);

  headerElement.innerHTML = `
    <div class="header-logo">
      <img src="src/assets/favicon.svg" alt="뉴스스탠드" />
      <p>뉴스스탠드</p>
    </div>
    <div class="header-date"></div>
  `;

  const headerDate = headerElement.querySelector(".header-date");
  headerDate.textContent = formatDate();

  return headerElement;
}