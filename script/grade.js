// 7. JavaScript 기초 - 성적 계산기

function calculateGrade() {
  // 과목 이름이 담긴 배열을 미리 준비
  var subjects = ["HTML", "CSS", "JavaScript"];
  var total = 0;

  // for문을 배열 길이만큼 돌면서 각 과목 점수를 입력받아 total에 더함
  for (var i = 0; i < subjects.length; i++) {
    var score = Number(prompt(subjects[i] + " 점수를 입력하세요."));
    total += score;
  }

  // 반복문이 끝난 후 평균 계산
  var average = total / subjects.length;

  // 합격 여부와 등급 결정
  var result;
  if (average >= 60) {
    if (average >= 80) {
      result = "🎉 합격입니다! 우수자로 선정되었습니다.";
    } else {
      result = "🎉 합격입니다!";
    }
  } else {
    result = "😢 불합격입니다.";
  }

  // 결과를 alert 창으로 표시
  alert(
    "====== 📋 성적 결과표 ======\n" +
    "• 총점: " + total + "점\n" +
    "• 평균: " + average.toFixed(1) + "\n" +
    "----------------------------\n" +
    "• 결과: " + result
  );
}
