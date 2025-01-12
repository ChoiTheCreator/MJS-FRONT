/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const weatherContainerStyle = css`
  background-color: white; /* 하얀색 배경 */
  color: #001f5c; /* 남색 글자 */
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
  // **더미 데이터 설정**
  const weatherData = {
    main: { temp: 25, humidity: 65 },
    weather: [{ description: '맑음', icon: '01d' }],
    wind: { speed: 1.5 },
  };

  /*

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&appid=YOUR_API_KEY`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('날씨 데이터 가져오기 실패:', error);
      }
    };
    fetchWeather();
  }, []);
  */

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
