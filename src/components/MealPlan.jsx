/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import apiClient from '../api/apiClient';
import { useEffect, useState } from 'react';
import LoadingComponent from './util/LoadingComponent';

const mealPlanStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.9rem;
  color: #333;
  height: 200px; /* 고정 높이 설정 */
  overflow-y: auto; /* 내부 스크롤 활성화 */
  padding: 10px;
  box-sizing: border-box; /* 패딩 포함하여 높이 계산 */

  h4 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #001f5c;
    margin-bottom: 10px; /* 제목과 내용 간 여백 추가 */
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;

    li {
      margin: 5px 0;
      word-wrap: break-word; /* 긴 단어 줄바꿈 처리 */
    }
  }
`;

const MealPlan = () => {
  //빈 배열로 초기값 설정
  const [mealInfo, setMealInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await apiClient.get('/weeklymenu/get');
        console.log(response.data.data);
        setMealInfo(response.data.data || []);
        setLoading(false);

        return response.data;
      } catch (error) {
        console.log('식단 조회 오류', error);
      }
    };
    fetchMealPlan();
  }, []);

  //요일 기준으로 맞춤
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const todayDayName = dayNames[new Date().getDay()];

  //24 시간 3교대로 타임마다, 아침, 점심 , 저녁 fetching
  const currentHour = new Date().getHours();
  let mealCategory = 'BREAKFAST';

  if (currentHour >= 8 && currentHour < 16) {
    mealCategory = 'LUNCH';
  } else if (currentHour >= 16) {
    mealCategory = 'DINNER';
  }

  //요일꺼를 타겟팅해서 찾는다.
  const todayMeals = mealInfo.filter((meal) =>
    meal.date.includes(`( ${todayDayName} )`)
  );

  const firstMeal =
    todayMeals.find((meal) => meal.menuCategory === mealCategory) ||
    todayMeals.find((meal) => meal.menuCategory === 'LUNCH') ||
    todayMeals.find((meal) => meal.menuCategory === 'BREAKFAST') ||
    todayMeals.find((meal) => meal.menuCategory === 'DINNER') ||
    null;

  if (loading) {
    return (
      <LoadingComponent message="식단 정보를 불러오는 중입니다."></LoadingComponent>
    );
  }

  return (
    <div css={mealPlanStyle}>
      <h4>오늘의 식단 </h4>
      <ul>
        <li>
          <strong>{firstMeal.date}</strong>
        </li>
        <li>{firstMeal.menuCategory}</li>
        {firstMeal.meals.map((menu, index) => (
          <li key={index}>{menu}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealPlan;
