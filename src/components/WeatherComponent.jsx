/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
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
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .weather-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.1rem;

    .weather-icon {
      width: 50px;
      height: 50px;
    }

    .temperature {
      font-size: 2rem;
      font-weight: bold;
    }
  }

  .weather-details {
    margin-top: 10px;
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        console.log('API 키:', apiKey);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('날씨 정보를 가져오는 데 실패했습니다:', error);
      }
    };
    fetchWeather();
  }, [apiKey]);

  if (!weatherData) {
    return <p>날씨 정보를 불러오는 중...</p>;
  }

  return (
    <div css={weatherContainerStyle}>
      <div className="weather-header">현재 날씨</div>
      <div className="weather-info">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="날씨 아이콘"
        />
        <div className="temperature">{weatherData.main.temp}°C</div>
      </div>
      <div className="weather-details">
        <p>{weatherData.weather[0].description}</p>
        <p>습도: {weatherData.main.humidity}%</p>
        <p>풍속: {weatherData.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherComponent;
