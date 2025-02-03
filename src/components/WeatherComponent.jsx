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
      width: 100px; /* 아이콘 크기 */
      height: 100px; /* 아이콘 크기 */
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
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [dailyMaxTemp, setDailyMaxTemp] = useState(null);
  const [dailyMinTemp, setDailyMinTemp] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=37.5826&lon=126.9139&units=metric&appid=${apiKey}`
        );
        setWeatherData(response.data);


      } catch (error) {
        console.error('날씨 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    fetchWeather();
    updateTime();
  }, [apiKey]);

  if (!weatherData) {
    return <p>날씨 정보를 불러오는 중...</p>;
  }

  // 미세먼지 및 추가 데이터 (API에 추가 요청 필요 시 별도로 처리)
  const airQuality = '좋음'; // 예시로 '좋음' 값 설정 (추가 데이터 필요 시 API 연결)
  const precipitation = '70%'; // 강수확률 (예시)
  const humidity = `${weatherData.main.humidity}%`; // 습도
  const windSpeed = `${weatherData.wind.speed} m/s`; // 풍속
  const maxTemp = weatherData.main.temp_max;
  const minTemp = weatherData.main.temp_min;

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
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="날씨 아이콘"
        />
        <div className="temperature-container">
          <div className="temperature">{weatherData.main.temp}°C</div>
          <div className="temp-range">
            최고: {maxTemp}°C | 최저: {minTemp}°C
          </div>
        </div>
      </div>
      <div className="weather-details">
        <div className="detail-item">강수확률: {precipitation}</div>
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
