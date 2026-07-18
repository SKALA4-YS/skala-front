// myClass - 오늘 요일 열 자동 강조
// new Date().getDay()로 오늘 요일을 구해, 시간표에서 해당 열(<col>)과
// 헤더(<th>)에 강조 클래스를 붙인다.

// getDay()는 0=일, 1=월, 2=화 ... 6=토 를 돌려준다
var dayNames = ["일", "월", "화", "수", "목", "금", "토"];
var today = new Date().getDay();

var noteEl = document.getElementById("today-note");

// 표의 열 순서: [시간, 월, 화, 수, 목, 금]
// → getDay 값 1(월)~5(금)이 그대로 <col> 인덱스 1~5와 일치한다.
if (today >= 1 && today <= 5) {
  var cols = document.querySelectorAll("colgroup col");
  var ths = document.querySelectorAll("thead th");

  cols[today].classList.add("today-col"); // 오늘 열 배경 강조
  ths[today].classList.add("today-th");   // 오늘 요일 헤더 강조

  noteEl.textContent = "오늘은 " + dayNames[today] + "요일입니다. 오늘 수업이 강조되어 있어요! ✨";
} else {
  // 주말(토·일)이면 강조할 열이 없음
  noteEl.textContent = "오늘은 " + dayNames[today] + "요일이라 수업이 없습니다. 푹 쉬세요! 🌟";
}
