/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const weatherContainerStyle = css`
  background-color: white;
  color: #001f5c;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans KR', sans-serif;

  .weather-header {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .current-time {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 10px;
  }

  .weather-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 20px;

    .weather-icon {
      width: 100px;
      height: 100px;
    }

    .temperature-container {
      position: relative;
      right: 180px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .temperature {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .temp-range {
        font-size: 1rem;
        color: #555;
      }
    }
  }

  .weather-details {
    font-size: 0.9rem;
    color: #333;
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: left;
    margin: 0 auto;
    width: fit-content;

    .detail-item {
      margin: 5px 0;
    }
  }

  .air-quality {
    margin-top: 15px;
    font-size: 0.9rem;
    color: #777;
  }
`;

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null); // 현재 날씨 데이터
  const [dailyMaxTemp, setDailyMaxTemp] = useState(null);
  const [dailyMinTemp, setDailyMinTemp] = useState(null);
  const [precipitationProbability, setPrecipitationProbability] =
    useState(null);
  const [airQuality, setAirQuality] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 1. 현재 날씨 데이터
        const responseCurrent = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=37.5826&lon=126.9139&units=metric&appid=${apiKey}`
        );
        setWeatherData(responseCurrent.data);

        // 2. 5일/3시간 단위 예보 데이터를 이용해 오늘의 일별 최고/최저 온도 산출
        const responseForecast = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=37.5826&lon=126.9139&units=metric&appid=${apiKey}`
        );
        const forecastList = responseForecast.data.list;

        // 오늘 날짜 (YYYY-MM-DD)
        const todayDate = new Date().toISOString().split('T')[0];
        // 오늘에 해당하는 예보 항목 필터링
        const todayForecasts = forecastList.filter((item) =>
          item.dt_txt.startsWith(todayDate)
        );

        if (todayForecasts.length > 0) {
          const dailyMax = Math.max(
            ...todayForecasts.map((item) => item.main.temp_max)
          );
          const dailyMin = Math.min(
            ...todayForecasts.map((item) => item.main.temp_min)
          );
          setDailyMaxTemp(dailyMax);
          setDailyMinTemp(dailyMin);

          // 예보 데이터에 강수확률(pop)이 포함되어 있으면 평균값 계산 (pop는 0~1 사이의 값)
          const avgPop =
            todayForecasts.reduce((acc, item) => acc + (item.pop || 0), 0) /
            todayForecasts.length;
          setPrecipitationProbability(Math.round(avgPop * 100));
        }

        // 3. 대기오염 데이터 (미세먼지/초미세먼지)
        const responseAir = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=37.5826&lon=126.9139&appid=${apiKey}`
        );
        const aqi = responseAir.data.list[0].main.aqi;
        let airQualityStr = '';
        switch (aqi) {
          case 1:
            airQualityStr = '좋음';
            break;
          case 2:
            airQualityStr = '보통';
            break;
          case 3:
            airQualityStr = '민감군주의보';
            break;
          case 4:
            airQualityStr = '나쁨';
            break;
          case 5:
            airQualityStr = '매우나쁨';
            break;
          default:
            airQualityStr = '정보없음';
        }
        setAirQuality(airQualityStr);
      } catch (error) {
        console.error('날씨 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    // 현재 시간 업데이트
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    fetchWeather();
    updateTime();
  }, [apiKey]);

  if (
    !weatherData ||
    dailyMaxTemp === null ||
    dailyMinTemp === null ||
    precipitationProbability === null
  ) {
    return <p>날씨 정보를 불러오는 중...</p>;
  }

  // 현재 날씨 데이터에서 필요한 값 추출
  const currentTemp = weatherData.main.temp;
  const weatherIcon = weatherData.weather[0].icon;
  const humidity = `${weatherData.main.humidity}%`;
  const windSpeed = `${weatherData.wind.speed} m/s`;

  return (
    <div css={weatherContainerStyle}>
      <div className="weather-header">서대문구 남가좌동</div>
      <div
        className="current-time"
        style={{
          marginLeft: 'auto',
          textAlign: 'right',
          display: 'block',
        }}
      >
        현재 시간: {currentTime}
      </div>
      <div className="weather-info">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
          alt="날씨 아이콘"
        />
        <div className="temperature-container">
          <div className="temperature">{currentTemp}°C</div>
          <div className="temp-range">
            최고: {dailyMaxTemp}°C | 최저: {dailyMinTemp}°C
          </div>
        </div>
      </div>
      <div className="weather-details">
        <div className="detail-item">강수확률: {precipitationProbability}%</div>
        <div className="detail-item">습도: {humidity}</div>
        <div className="detail-item">풍속: {windSpeed}</div>
      </div>
      <div className="air-quality">
        미세먼지: {airQuality} | 초미세먼지: {airQuality}
      </div>
    </div>
  );
};

export default WeatherComponent;
