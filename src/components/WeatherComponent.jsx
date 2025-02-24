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
  const [weatherData, setWeatherData] = useState(null);
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
        const responseCurrent = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=37.5826&lon=126.9139&units=metric&appid=${apiKey}`
        );
        setWeatherData(responseCurrent.data);

        const responseForecast = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=37.5826&lon=126.9139&units=metric&appid=${apiKey}`
        );
        const todayDate = new Date().toISOString().split('T')[0];
        const todayForecasts = responseForecast.data.list.filter((item) =>
          item.dt_txt.startsWith(todayDate)
        );

        if (todayForecasts.length > 0) {
          setDailyMaxTemp(
            Math.max(...todayForecasts.map((item) => item.main.temp_max))
          );
          setDailyMinTemp(
            Math.min(...todayForecasts.map((item) => item.main.temp_min))
          );
          const avgPop =
            todayForecasts.reduce((acc, item) => acc + (item.pop || 0), 0) /
            todayForecasts.length;
          setPrecipitationProbability(Math.round(avgPop * 100));
        }

        const responseAir = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=37.5826&lon=126.9139&appid=${apiKey}`
        );
        const aqi = responseAir.data.list[0].main.aqi;
        setAirQuality(
          ['좋음', '보통', '민감군주의보', '나쁨', '매우나쁨'][aqi - 1] ||
            '정보없음'
        );
      } catch (error) {
        console.error('날씨 정보를 가져오는 데 실패했습니다:', error);
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
  }, [apiKey]);

  if (
    !weatherData ||
    dailyMaxTemp === null ||
    dailyMinTemp === null ||
    precipitationProbability === null
  ) {
    return <p>날씨 정보를 불러오는 중...</p>;
  }

  return (
    <div css={weatherContainerStyle}>
      <div className="weather-header">서대문구 남가좌동</div>
      <div className="current-time">현재 시간: {currentTime}</div>
      <div className="icon-container"></div>
      <div className="weather-info">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="날씨 아이콘"
        />
        <div className="temperature-container">
          <div className="temperature">{weatherData.main.temp}°C</div>
          <div className="temp-range">
            최고: {dailyMaxTemp}°C | 최저: {dailyMinTemp}°C
          </div>
        </div>
      </div>
      <div className="weather-details">
        <div>강수확률: {precipitationProbability}%</div>
        <div>습도: {weatherData.main.humidity}%</div>
        <div>풍속: {weatherData.wind.speed} m/s</div>
      </div>
      <div className="air-quality">
        미세먼지: {airQuality} | 초미세먼지: {airQuality}
      </div>
    </div>
  );
};

export default WeatherComponent;
