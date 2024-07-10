import "@/components/newsStand/mediaButton/MediaButtonEvents.js";
import "@/components/newsStand/NewsStand.js";

import Header from "@/components/header/Header.js";
import Headline from "@/components/headline/Headline.js";
import Button from "@/components/button/Button.js";

Header("header");
Headline("headline");

document.querySelector(".container").prepend(Button(
  "left-btn",
  "src/assets/buttons/leftButton.svg",
  "좌측 화살표"
));
document.querySelector(".container").append(Button(
  "right-btn",
  "src/assets/buttons/rightButton.svg",
  "우측 화살표"
));