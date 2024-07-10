import "./Button.css";

export default function Button(className, imageSrc, altText) {
  const button = document.createElement("button");
  button.className = className;

  const arrowClassName = `${className.split("-")[0]}-arrow`;
  button.innerHTML = `<img src="${imageSrc}" alt="${altText}" class="${arrowClassName}">`;

  return button;
}