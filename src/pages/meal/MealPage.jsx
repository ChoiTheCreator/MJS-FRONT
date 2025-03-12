import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { getWeeklyMenu } from '../../api/mealApi';
import LoadingComponent from '../../components/util/LoadingComponent';

const mealTableStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;

  table {
    width: 100%;
    max-width: 900px;
    border-collapse: collapse;
    margin-top: 10px;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    vertical-align: top;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
`;

const MealPage = () => {
  const [loading, setLoading] = useState(true);
  const [mealData, setMealData] = useState([]);

  // 조식/중식/석식 순서대로 돌릴 배열
  const mealCategories = ['BREAKFAST', 'LUNCH', 'DINNER'];

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        // 실제로 백엔드에서 7일치 식단 데이터를 가져온다고 가정
        const data = await getWeeklyMenu();
        console.log('API로부터 받은 mealData:', data);
        setMealData(data);
      } catch (error) {
        console.error('식단 불러오기 실패', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealData();
  }, []);

  if (loading) {
    return <LoadingComponent message="식단 정보를 불러오고 있습니다." />;
  }

  // 혹시 데이터가 없으면
  if (!mealData || mealData.length === 0) {
    return <div>식단 정보가 없습니다.</div>;
  }

  return (
    <div css={mealTableStyle}>
      <div>
        <strong> 식단 | </strong>
        <span> `인문 캠퍼스 학생회관 3층 $` </span>
      </div>
    </div>
  );
};

export default MealPage;
