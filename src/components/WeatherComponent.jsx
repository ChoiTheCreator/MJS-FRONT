/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import { weatherFetch } from '../api/weatherApi';

const loadingContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  color: #555;
`;

const spinnerStyle = css`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 31, 92, 0.3);
  border-top: 4px solid #001f5c;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

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
    text-align: right;
  }

  .weather-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
  }

  .weather-icon {
    width: 80px;
    height: 80px;
    margin-right: auto;
  }

  .temperature-container {
    display: flex;
    margin-right: 170px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .temperature {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .temp-range {
      font-size: 1rem;
      color: #555;
    }
  }

  .weather-details {
    font-size: 0.9rem;
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .air-quality {
    margin-top: 15px;
    font-size: 0.9rem;
    color: #777;
  }
`;

const WeatherComponent = () => {
  //영은이로부터 받아올 상태 저장
  const [weatherData, setWeatherData] = useState(null);

  //현재시간은 영은이가 안줌 ㅠ;
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await weatherFetch();
        setWeatherData(data);
      } catch (error) {
        console.error('❌ 날씨 데이터를 불러오지 못했습니다.', error);
      }
    };

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        `${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}`
      );
    };

    fetchWeather();
    updateTime();
    //dep -> 초기 한번만 서버에서 fetching
  }, []);

  if (!weatherData) {
    return (
      <div css={loadingContainerStyle}>
        <div css={spinnerStyle}></div>
        <p style={{ color: 'navy', fontWeight: 'bold' }}>
          날씨 정보를 불러오는 중...
        </p>
      </div>
    );
  }

  return (
    <div css={weatherContainerStyle}>
      <div className="weather-header">{weatherData.location}</div>
      <div className="current-time">현재 시간: {currentTime}</div>
      <div className="weather-info">
        <div className="weather-icon-container">
          <img
            className="weather-icon"
            src={weatherData.weatherIcon}
            alt="날씨 아이콘"
          />
        </div>
        <div className="temperature-container">
          <div className="temperature">{weatherData.temperature}°C</div>
          <div className="temp-range">
            최고: {weatherData.maxTemperature}°C | 최저:{' '}
            {weatherData.minTemperature}°C
          </div>
        </div>
      </div>
      <div className="weather-details">
        <div>체감 온도: {weatherData.feelsLike}°C</div>
        <div>습도: {weatherData.humidity}%</div>
        <div>날씨: {weatherData.weatherDescription}</div>
      </div>
      <div className="air-quality">
        미세먼지: {weatherData.pm10Category} ({weatherData.pm10}) | 초미세먼지:{' '}
        {weatherData.pm2_5Category} ({weatherData.pm2_5})
      </div>
    </div>
  );
};

export default WeatherComponent;
