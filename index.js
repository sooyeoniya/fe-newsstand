import Header from "@/components/header/Header.js";
import Headline from "@/components/headline/Headline.js";
import Button from "@/components/button/Button.js";
import NewsStand from "@/components/newsStand/NewsStand.js";

const BUTTON_CONFIG = {
  left: {
    id: "left-btn",
    src: "src/assets/buttons/leftButton.svg",
    alt: "좌측 화살표"
  },
  right: {
    id: "right-btn",
    src: "src/assets/buttons/rightButton.svg",
    alt: "우측 화살표"
  }
};

function initializeComponents() {
  Header("header");
  Headline("headline");
  NewsStand("newsstand");
}

function createButton(config) {
  return Button(config.id, config.src, config.alt);
}

function addNavigationButtons() {
  const container = document.querySelector(".container");
  
  const leftButton = createButton(BUTTON_CONFIG.left);
  const rightButton = createButton(BUTTON_CONFIG.right);

  container.insertBefore(leftButton, container.firstChild);
  container.appendChild(rightButton);
}

function init() {
  initializeComponents();
  addNavigationButtons();
}

init();