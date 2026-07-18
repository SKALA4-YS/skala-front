// 7. JavaScript 기초 - 내 가방 보기
// (승격) 소지품 배열을 alert 문자열이 아니라 화면(#game-output)에 카드 리스트로 그린다.

function showMyBag() {
  // myBag 배열: 소지품 객체(이름, 개수, 아이콘)들의 임의 데이터
  var myBag = [
    { name: "여권", count: 1, icon: "🛂" },
    { name: "스마트폰", count: 2, icon: "📱" },
    { name: "지갑", count: 1, icon: "👛" }
  ];

  var totalCount = 0; // 물품 '개수'의 합계 (종류가 아니라 실제 개수)
  var items = "";     // 소지품 <li>들을 이어 붙일 문자열

  // 반복문으로 소지품 객체를 하나씩 카드(<li>)로 만든다
  for (var i = 0; i < myBag.length; i++) {
    var item = myBag[i];
    totalCount += item.count;
    items +=
      '<li class="bag-item">' +
        '<span class="bag-icon">' + item.icon + '</span>' +
        '<span class="bag-name">' + item.name + '</span>' +
        '<span class="bag-count">' + item.count + '개</span>' +
      '</li>';
  }

  // 완성한 HTML을 출력 공간에 그린다 (alert → innerHTML 승격)
  var box = document.getElementById("game-output");
  box.innerHTML =
    "<h3>🎒 내 가방 속 물품</h3>" +
    '<ul class="bag-list">' + items + "</ul>" +
    '<p class="bag-summary">총 ' + myBag.length + "가지 · " + totalCount + "개</p>";
}
