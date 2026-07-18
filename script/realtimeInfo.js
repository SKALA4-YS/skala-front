// 8. JavaScript 심화 - 모듈분리 (화면 담당)

// weatherAPI 모듈로부터 데이터/함수를 import
import { cities, fetchWeather } from "./weatherAPI.js";

// DOM 요소 가져오기
var citySelect = document.getElementById("city-select");
var weatherBox = document.getElementById("weather-box");

// 도시를 바꿀 때마다(change 이벤트) 실행
citySelect.addEventListener("change", async function () {
  var city = cities[citySelect.value];

  // 아무것도 선택하지 않은 경우 비우기
  if (!city) {
    weatherBox.innerHTML = "";
    return;
  }

  // 데이터를 받아오는 동안 로딩 스피너 표시 (fetch가 끝나면 결과로 교체됨)
  weatherBox.innerHTML =
    '<p class="loading"><span class="spinner"></span> 실시간 날씨 로딩 중...</p>';

  try {
    // 데이터 담당 모듈에 요청 (실제 fetch는 weatherAPI.js가 처리)
    var weather = await fetchWeather(city.lat, city.lon);

    // 받아온 데이터를 화면에 그림
    weatherBox.innerHTML =
      "<h3>🌍 모듈형 날씨 피드: " + city.name + "</h3>" +
      "<ul>" +
      "<li>🌡️ 기온: " + weather.temp + "°C</li>" +
      "<li>💧 습도: " + weather.humidity + "%</li>" +
      "</ul>";
  } catch (error) {
    weatherBox.innerHTML = "<p>❌ 날씨 정보를 불러오지 못했습니다.</p>";
  }
});
