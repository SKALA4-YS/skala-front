// myHoliday - 현재 시각대 일과 하이라이트
// new Date().getHours()로 지금 시(hour)를 구해, 해당하는 <section>을 강조한다.

var sections = document.querySelectorAll(".holiday-section");
var labels = ["평온한 아침", "본격적인 활동", "저녁과 밤"];

var hour = new Date().getHours(); // 0~23
var active;

// 시간대 → 활성 섹션 인덱스 (아침 0 / 활동 1 / 저녁·밤 2)
if (hour >= 6 && hour < 13) {
  active = 0;
} else if (hour >= 13 && hour < 18) {
  active = 1;
} else {
  active = 2; // 18시~다음날 새벽(6시 전)까지는 저녁·밤
}

sections[active].classList.add("now"); // 해당 섹션에 강조 클래스

document.getElementById("now-note").textContent =
  "지금은 " + hour + "시, '" + labels[active] + "' 시간대예요. 해당 일과가 강조되어 있어요! ✨";
