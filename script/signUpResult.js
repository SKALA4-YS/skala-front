// ============================================================
// signUpResult.js
// 회원가입 폼(signUp.html, method="get")이 URL 뒤에 붙여 보낸
// 입력값을 읽어 결과 페이지에 "환영 인사 + 요약표"로 렌더링한다.
//
// 예) signUpResult.html?userId=abc&name=%EB%82%98&interest=frontend&interest=uiux
//   → ? 뒤의 문자열이 폼에서 넘어온 데이터. 이걸 해석(파싱)하는 게 핵심.
// ============================================================

// ------------------------------------------------------------
// 1) URL 쿼리스트링을 { 키: 값 } 객체로 바꾸는 함수
// ------------------------------------------------------------
function parseQuery(search) {
  const result = {};

  const query = search.slice(1); // 맨 앞의 '?' 한 글자를 잘라낸다
  if (query === "") return result; // 아무 값도 없으면 빈 객체 반환

  const pairs = query.split("&"); // "a=1&b=2" → ["a=1", "b=2"]
  for (const pair of pairs) {
    const eq = pair.indexOf("="); // 첫 번째 '=' 위치 (값 안에 '='이 있어도 안전)
    const rawKey = pair.slice(0, eq);
    const rawValue = pair.slice(eq + 1);

    // URL은 한글·공백을 %코드(공백은 '+')로 인코딩해서 보낸다.
    // decodeURIComponent(): 그 %코드를 원래 글자로 되돌리는 내장 함수.
    const key = decodeURIComponent(rawKey);
    const value = decodeURIComponent(rawValue.split("+").join(" "));

    // 체크박스(interest)처럼 같은 이름이 여러 번 오면 배열로 모은다.
    if (key in result) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value]; // 두 번째부터 배열로 승격
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

// ------------------------------------------------------------
// 2) 폼에서 넘어온 '코드값'을 사람이 읽을 '라벨'로 바꾸는 사전
//    (예: gender=male → "남성")
// ------------------------------------------------------------
const genderLabel = { male: "남성", female: "여성", none: "선택 안 함" };
const interestLabel = {
  frontend: "웹 프론트엔드 (Vue.js/HTML)",
  uiux: "UI/UX 디자인 표준",
  backend: "백엔드 & 데이터베이스",
  cloud: "클라우드 & 인프라",
};
const pathLabel = { search: "검색", friend: "지인 추천", sns: "SNS" };

// innerHTML에 넣기 전, 사용자가 입력한 글자 속 <, >, & 를 무해하게 바꿔
// 화면이 깨지거나 태그로 오해되는 걸 막는다(안전 습관).
function escapeHtml(text) {
  return String(text)
    .split("&").join("&amp;")
    .split("<").join("&lt;")
    .split(">").join("&gt;");
}

// ------------------------------------------------------------
// 3) 실제 렌더링
// ------------------------------------------------------------
const params = parseQuery(location.search);
const welcomeEl = document.getElementById("welcome");
const summaryEl = document.getElementById("summary");

// (예외) 폼을 거치지 않고 이 페이지를 직접 연 경우
if (Object.keys(params).length === 0) {
  welcomeEl.textContent = "환영합니다! 🎊";
  summaryEl.innerHTML =
    '<p>입력하신 가입 정보가 없습니다. ' +
    '<a href="signUp.html">회원가입 페이지</a>에서 먼저 작성해 주세요.</p>';
} else {
  // 이름이 있으면 이름, 없으면 아이디로 인사
  const displayName = params.name || params.userId || "회원";
  welcomeEl.textContent = `환영합니다, ${displayName}님! 🎊`;

  // 관심 분야: 없을 수도 / 하나(문자열)일 수도 / 여러 개(배열)일 수도 있음 → 배열로 통일
  let interests = params.interest || [];
  if (!Array.isArray(interests)) interests = [interests];
  const interestText = interests.map((v) => interestLabel[v] || v).join(", ");

  // 이메일: 아이디 + '@' + 도메인 (도메인을 '직접 입력'으로 비웠으면 아이디만)
  let email = params.email || "";
  if (email && params.emailDomain) email += "@" + params.emailDomain;

  // 표에 넣을 [항목, 값] 목록
  const rows = [
    ["아이디", params.userId],
    ["이메일", email],
    ["이름", params.name],
    ["생년월일", params.birth],
    ["성별", genderLabel[params.gender]],
    ["관심 분야", interestText],
    ["가입 경로", pathLabel[params.path]],
    ["한 줄 소개", params.intro],
  ];

  // 값이 있는 항목만 골라 표의 행(tr)으로 만든다
  let tableRows = "";
  for (const [label, value] of rows) {
    if (value) {
      tableRows += `<tr><th>${label}</th><td>${escapeHtml(value)}</td></tr>`;
    }
  }

  summaryEl.innerHTML =
    "<p>아래 정보로 가입되었습니다.</p>" +
    `<table class="summary-table"><tbody>${tableRows}</tbody></table>`;
}
