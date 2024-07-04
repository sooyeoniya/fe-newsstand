import { dateUtil } from "./dateUtil.js";

const formattedDate = dateUtil();
document.querySelector('.header-date').textContent = formattedDate;