// 8. JavaScript 심화 - 실시간 날씨 (DOM / 이벤트)

// 도시별 이름과 위도/경도 데이터
var cities = {
  paris:   { name: "프랑스 파리 FR",   lat: 48.85, lon: 2.35 },
  seoul:   { name: "대한민국 서울 KR", lat: 37.57, lon: 126.98 },
  tokyo:   { name: "일본 도쿄 JP",     lat: 35.68, lon: 139.69 },
  newyork: { name: "미국 뉴욕 US",     lat: 40.71, lon: -74.01 }
};

// DOM 요소 가져오기
var citySelect = document.getElementById("city-select");
var weatherBox = document.getElementById("weather-box");

// 도시를 바꿀 때마다(change 이벤트) 실행
citySelect.addEventListener("change", function () {
  var city = cities[citySelect.value];

  // 아무것도 선택하지 않은 경우 비우기
  if (!city) {
    weatherBox.innerHTML = "";
    return;
  }

  // DOM 조작(innerHTML)으로 선택한 도시 정보를 화면에 표시
  weatherBox.innerHTML =
    "<h3>📍 " + city.name + " 정보</h3>" +
    "<ul>" +
    "<li>위도(Latitude): " + city.lat + "</li>" +
    "<li>경도(Longitude): " + city.lon + "</li>" +
    "</ul>";
});
