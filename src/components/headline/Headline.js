import renderHeadline from "./HeadlineRenderer.js";
import startRolling from "./HeadlineRolling.js";
import { HEADLINE_ITEMS } from "../../constants/constants.js";
import "./Headlines.css";

function createHeadlineElement() {
  return HEADLINE_ITEMS.map(headlineItemId => {
    return `
    <div class="headline-item" id=${headlineItemId}>
      <ul class="rolling"></ul>
    </div>`;
  }).join("");
}

function updateHeadlineElement() {
  HEADLINE_ITEMS.map((headlineItemId, index) => renderHeadline(index, headlineItemId));
  startRolling();
}

// 헤드라인 전체 영역 UI
export default function Headline(elementId) {
  const headlineElement = document.getElementById(elementId);
  headlineElement.innerHTML = createHeadlineElement();
  updateHeadlineElement();
}