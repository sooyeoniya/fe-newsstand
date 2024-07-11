import renderHeadline from "./HeadlineRenderer.js";
import startRolling from "./HeadlineRolling.js";
import "./Headlines.css";

export default function Headline(elementId) {
  const headlineElement = document.getElementById(elementId);

  headlineElement.innerHTML = `
    <div class="headline-item" id="headline-item-1">
      <ul class="rolling"></ul>
    </div>
    <div class="headline-item" id="headline-item-2">
      <ul class="rolling"></ul>
    </div>
  `;

  renderHeadline(0, "headline-item-1");
  renderHeadline(1, "headline-item-2");
  startRolling();
}