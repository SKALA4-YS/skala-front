// 8. JavaScript 심화 - 모듈분리 (데이터 담당)

// 도시별 이름과 위도/경도 데이터
export var cities = {
  paris:   { name: "프랑스 파리 FR",   lat: 48.85, lon: 2.35 },
  seoul:   { name: "대한민국 서울 KR", lat: 37.57, lon: 126.98 },
  tokyo:   { name: "일본 도쿄 JP",     lat: 35.68, lon: 139.69 },
  newyork: { name: "미국 뉴욕 US",     lat: 40.71, lon: -74.01 }
};

// Open-Meteo 서버에서 날씨 데이터를 비동기로 가져오는 함수 (export)
export async function fetchWeather(lat, lon) {
  var url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat +
            "&longitude=" + lon +
            "&current=temperature_2m,relative_humidity_2m";

  var response = await fetch(url);
  var data = await response.json();

  // 화면에서 쓰기 좋게 필요한 값만 정리해서 반환
  return {
    temp: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m
  };
}
