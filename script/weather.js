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

// 도시를 바꿀 때마다(change 이벤트) 실행 - async 함수로 비동기 처리
citySelect.addEventListener("change", async function () {
  var city = cities[citySelect.value];

  // 아무것도 선택하지 않은 경우 비우기
  if (!city) {
    weatherBox.innerHTML = "";
    return;
  }

  // 1) 데이터를 받아오는 동안 로딩 메시지 표시
  weatherBox.innerHTML = "<p>실시간 날씨 로딩 중... ⏳</p>";

  // 2) Open-Meteo 서버에 날씨 데이터 요청 (fetch + async/await)
  var url = "https://api.open-meteo.com/v1/forecast?latitude=" + city.lat +
            "&longitude=" + city.lon +
            "&current=temperature_2m,relative_humidity_2m";

  try {
    var response = await fetch(url);
    var data = await response.json();

    var temp = data.current.temperature_2m;
    var humidity = data.current.relative_humidity_2m;

    // 3) 다운로드 완료 후 실시간 온도/습도를 화면에 그림
    weatherBox.innerHTML =
      "<h3>🌍 " + city.name + " 실시간 날씨</h3>" +
      "<ul>" +
      "<li>🌡️ 현재 기온: " + temp + "°C</li>" +
      "<li>💧 현재 습도: " + humidity + "%</li>" +
      "</ul>";
  } catch (error) {
    weatherBox.innerHTML = "<p>❌ 날씨 정보를 불러오지 못했습니다.</p>";
  }
});
