import { dateUtil } from "../utils/dateUtil.js";

const formattedDate = dateUtil();
document.querySelector('.header-date').textContent = formattedDate;
// console.log(formattedDate);