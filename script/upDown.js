// 7. JavaScript 기초 - Up-Down 숫자 맞추기 게임

function startUpDownGame() {
  // 컴퓨터가 1부터 50 사이의 무작위 숫자 하나를 생성
  var computerNum = Math.floor(Math.random() * 50) + 1;
  var tryCount = 0;

  while (true) {
    // prompt 창으로 사용자에게 숫자를 입력받음
    var input = prompt("1부터 50 사이의 숫자 중 컴퓨터가 생각한 숫자는 무엇일까요?");

    // '취소'를 누르면 게임 중단
    if (input === null) {
      alert("게임을 종료합니다.");
      return;
    }

    var userNum = Number(input);

    // 숫자가 아니거나 범위를 벗어난 입력 처리
    if (isNaN(userNum) || userNum < 1 || userNum > 50) {
      alert("1부터 50 사이의 숫자를 입력해 주세요.");
      continue;
    }

    tryCount++;

    if (userNum > computerNum) {
      alert("Down!");
    } else if (userNum < computerNum) {
      alert("Up!");
    } else {
      alert("축하합니다! " + tryCount + "번 만에 맞추셨습니다.");
      break;
    }
  }
}
