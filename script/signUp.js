// HTML Form - 회원가입 유효성 검사
// 제출(submit) 순간 입력값 규칙을 검사하고, 어기면 전송을 막아
// 결과 페이지로 넘어가지 못하게 한다. 오류는 화면 박스에 목록으로 표시.

// 문자열이 영문/숫자로만 이루어졌는지 검사 (정규식 대신 한 글자씩 확인)
function isAlnum(str) {
  for (var i = 0; i < str.length; i++) {
    var ch = str[i];
    var ok =
      (ch >= "0" && ch <= "9") ||
      (ch >= "a" && ch <= "z") ||
      (ch >= "A" && ch <= "Z");
    if (!ok) return false; // 하나라도 아니면 즉시 false
  }
  return true;
}

var signUpForm = document.querySelector("form");

signUpForm.addEventListener("submit", function (e) {
  var errors = []; // 모아둘 오류 메시지들
  var firstBad = null; // 첫 번째 문제 입력칸 (커서를 옮겨줄 대상)

  var idEl = document.getElementById("userId");
  var pwEl = document.getElementById("userPw");
  var emailEl = document.getElementById("email");
  var domainEl = document.querySelector('select[name="emailDomain"]');

  var userId = idEl.value.trim();
  var userPw = pwEl.value;
  var email = emailEl.value.trim();
  var domain = domainEl.value;

  // 1) 아이디: 4~15자 + 영문/숫자만
  if (userId.length < 4 || userId.length > 15 || !isAlnum(userId)) {
    errors.push("아이디는 4~15자의 영문/숫자로 입력해 주세요.");
    if (!firstBad) firstBad = idEl;
  }

  // 2) 비밀번호: 8자 이상
  if (userPw.length < 8) {
    errors.push("비밀번호는 8자 이상 입력해 주세요.");
    if (!firstBad) firstBad = pwEl;
  }

  // 3) 이메일: 입력했다면 도메인까지 갖추도록 (선택 입력이라 비우면 통과)
  if (email !== "" && domain === "" && email.indexOf("@") === -1) {
    errors.push("이메일 도메인을 선택하거나 전체 주소(@ 포함)를 입력해 주세요.");
    if (!firstBad) firstBad = emailEl;
  }

  var box = document.getElementById("signup-error");

  if (errors.length > 0) {
    // 규칙 위반 → 전송 막기 (결과 페이지로 넘어가지 않음)
    e.preventDefault();

    // 오류 목록을 빨간 박스에 그린다
    var items = "";
    for (var i = 0; i < errors.length; i++) {
      items += "<li>" + errors[i] + "</li>";
    }
    box.innerHTML = "<strong>⚠️ 아래 항목을 확인해 주세요</strong><ul>" + items + "</ul>";

    if (firstBad) firstBad.focus(); // 첫 문제 칸으로 커서 이동
  } else {
    // 통과 → 박스 비우고 정상 제출 (signUpResult.html로 이동)
    box.innerHTML = "";
  }
});
