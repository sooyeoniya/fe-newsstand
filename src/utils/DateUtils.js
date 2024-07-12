export function formatDate() {
  const today = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const year = today.getFullYear(); // 연도
  const month = String(today.getMonth() + 1).padStart(2, "0");  // 월
  const date = String(today.getDate()).padStart(2, "0");  // 날짜
  const day = today.getDay();  // 요일

  return `${year}. ${month}. ${date}. ${days[day]}요일`;
}