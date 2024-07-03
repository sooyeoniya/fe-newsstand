export function dateUtil() {
  const today = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const year = today.getFullYear(); // 연도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  const day = today.getDay();  // 요일

  // 2자리 수 출력
  month = month >= 10 ? month : "0" + month;
  date = date >= 10 ? date : "0" + date;

  return `${year}. ${month}. ${date}. ${days[day]}요일`;
}
