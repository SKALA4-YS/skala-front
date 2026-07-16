// 7. JavaScript 기초 - 내 가방 보기

function showMyBag() {
  // myBag 배열: 소지품 객체(이름, 개수, 아이콘)들의 임의 데이터
  var myBag = [
    { name: "여권", count: 1, icon: "🛂" },
    { name: "스마트폰", count: 2, icon: "📱" },
    { name: "지갑", count: 1, icon: "👛" }
  ];

  var message = "🎒 [내 가방 속 물품 목록]\n";
  message += "----------------------------\n";

  // 반복문으로 소지품 객체를 하나씩 출력
  for (var i = 0; i < myBag.length; i++) {
    var item = myBag[i];
    message += "- " + item.name + " " + item.icon + " : " + item.count + "개\n";
  }

  message += "----------------------------\n";
  message += "총 물품 종류: " + myBag.length + "가지";

  alert(message);
}
