import "./Button.css";

export default function Button(className, imageSrc, altText) {
  const button = document.createElement("button");
  button.className = className;

  const image = document.createElement("img");
  image.src = imageSrc;
  image.alt = altText;
  image.className = `${className.split("-")[0]}-arrow`;

  button.appendChild(image);

  return button;
}