// 7. JavaScript 기초 - 성적 계산기
// (승격) 결과를 alert 창이 아니라 화면(#game-output)에 성적표 '테이블'로 그린다.

function calculateGrade() {
  // 과목 이름이 담긴 배열을 미리 준비
  var subjects = ["HTML", "CSS", "JavaScript"];
  var scores = []; // 과목별 점수를 순서대로 저장해 둘 배열 (표를 그릴 때 다시 씀)
  var total = 0;

  // for문을 배열 길이만큼 돌면서 각 과목 점수를 입력받아 저장 + total에 더함
  for (var i = 0; i < subjects.length; i++) {
    var score = Number(prompt(subjects[i] + " 점수를 입력하세요."));
    if (isNaN(score)) score = 0; // 취소하거나 숫자가 아니면 0점 처리 (NaN 방지)
    scores.push(score);
    total += score;
  }

  // 반복문이 끝난 후 평균 계산
  var average = total / subjects.length;

  // 합격 여부와 등급 결정 (result: 문구 / resultClass: 색상용 클래스)
  var result;
  var resultClass;
  if (average >= 60) {
    if (average >= 80) {
      result = "🎉 합격입니다! 우수자로 선정되었습니다.";
    } else {
      result = "🎉 합격입니다!";
    }
    resultClass = "pass";
  } else {
    result = "😢 불합격입니다.";
    resultClass = "fail";
  }

  // 과목별 점수를 표의 행(<tr>)으로 하나씩 이어 붙인다
  var rows = "";
  for (var i = 0; i < subjects.length; i++) {
    rows += "<tr><td>" + subjects[i] + "</td><td>" + scores[i] + "점</td></tr>";
  }

  // 완성한 HTML을 출력 공간에 그린다 (alert → innerHTML 승격)
  var box = document.getElementById("game-output");
  box.innerHTML =
    "<h3>📋 성적 결과표</h3>" +
    '<table class="grade-table">' +
      "<thead><tr><th>과목</th><th>점수</th></tr></thead>" +
      "<tbody>" + rows + "</tbody>" +
      "<tfoot>" +
        "<tr><th>총점</th><td>" + total + "점</td></tr>" +
        "<tr><th>평균</th><td>" + average.toFixed(1) + "점</td></tr>" +
      "</tfoot>" +
    "</table>" +
    '<p class="grade-result ' + resultClass + '">' + result + "</p>";
}
