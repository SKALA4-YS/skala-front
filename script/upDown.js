// 7. JavaScript 기초 - Up-Down 숫자 맞추기 게임
// (승격) prompt/alert 반복 → 화면 입력칸 + 버튼 이벤트로.
//        시도 기록·남은 기회를 DOM에 갱신하며 진행한다.

// 여러 번의 클릭에 걸쳐 유지해야 하는 '게임 상태'를 담아둘 변수
var upDownState = null;

// [게임 시작] index.html의 "업다운 게임 🚀" 버튼이 부른다
function startUpDownGame() {
  var MAX_TRIES = 7;

  // 상태 초기화: 정답, 시도 횟수, 남은 기회, 종료 여부
  upDownState = {
    answer: Math.floor(Math.random() * 50) + 1, // 1~50 무작위 정답
    tryCount: 0,
    remaining: MAX_TRIES,
    finished: false
  };

  // 입력칸 + 버튼 + 힌트 자리 + 기록 목록을 화면에 그린다
  var box = document.getElementById("game-output");
  box.innerHTML =
    "<h3>🚀 업다운 게임</h3>" +
    "<p>1~50 사이 숫자를 맞춰보세요! 남은 기회: " +
      '<strong id="ud-remaining">' + MAX_TRIES + "</strong>번</p>" +
    '<div class="ud-input-row">' +
      '<input type="number" id="ud-guess" min="1" max="50" placeholder="숫자">' +
      '<button id="ud-submit">확인</button>' +
    "</div>" +
    '<p id="ud-hint" class="ud-hint"></p>' +
    '<ul id="ud-history" class="ud-history"></ul>';

  // innerHTML로 새로 만든 요소들에 이벤트를 연결한다
  var input = document.getElementById("ud-guess");
  document.getElementById("ud-submit").addEventListener("click", handleGuess);
  // 엔터 키로도 제출되게 (e.key: 눌린 키 이름)
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") handleGuess();
  });
  input.focus();
}

// [추측 한 번 처리] "확인" 클릭 또는 엔터 때마다 실행
function handleGuess() {
  var state = upDownState;
  if (state === null || state.finished) return; // 게임이 없거나 이미 끝났으면 무시

  var input = document.getElementById("ud-guess");
  var hintEl = document.getElementById("ud-hint");
  var num = Number(input.value);

  // 유효성 검사: 빈칸·숫자아님·범위밖이면 기회 소모 없이 안내만
  if (input.value === "" || isNaN(num) || num < 1 || num > 50) {
    hintEl.textContent = "⚠️ 1부터 50 사이의 숫자를 입력해 주세요.";
    hintEl.className = "ud-hint warn";
    return;
  }

  state.tryCount++;
  state.remaining--;

  var mark; // 기록 목록에 남길 판정 문구
  if (num > state.answer) {
    hintEl.textContent = "⬇️ Down! 더 작은 숫자예요.";
    hintEl.className = "ud-hint";
    mark = "Down ⬇️";
  } else if (num < state.answer) {
    hintEl.textContent = "⬆️ Up! 더 큰 숫자예요.";
    hintEl.className = "ud-hint";
    mark = "Up ⬆️";
  } else {
    hintEl.textContent = "🎉 정답! " + state.tryCount + "번 만에 맞췄어요!";
    hintEl.className = "ud-hint win";
    mark = "정답 🎯";
    endGame();
  }

  // 시도 기록을 한 줄 추가 (기존 목록 뒤에 이어 붙임)
  document.getElementById("ud-history").innerHTML +=
    "<li>" + state.tryCount + "번째: <strong>" + num + "</strong> → " + mark + "</li>";

  // 남은 기회 숫자 갱신
  document.getElementById("ud-remaining").textContent = state.remaining;

  // 기회를 다 썼는데 아직 못 맞춘 경우 → 정답 공개하고 종료
  if (!state.finished && state.remaining <= 0) {
    hintEl.textContent = "😢 기회를 모두 사용했어요. 정답은 " + state.answer + "!";
    hintEl.className = "ud-hint lose";
    endGame();
  }

  // 다음 입력 준비: 입력칸 비우고 커서 유지
  input.value = "";
  input.focus();
}

// [게임 종료] 입력칸·버튼을 잠가 더 못 누르게 한다
function endGame() {
  upDownState.finished = true;
  var input = document.getElementById("ud-guess");
  var submit = document.getElementById("ud-submit");
  if (input) input.disabled = true;
  if (submit) submit.disabled = true;
}
