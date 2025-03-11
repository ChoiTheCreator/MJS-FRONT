import { css } from '@emotion/react';
import React, { useState } from 'react';

const mealTableStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;

  strong {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

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
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  .highlight {
    background-color: #e6f2ff;
    font-weight: bold;
  }
`;
const MealPage = () => {
  const [loading, setLoading] = useState(false);
  const [mealData, setMealData] = useState([]);
  const today = new Date();

  return (
    <div>
      <strong> 식단 </strong>
      <span> `인문 캠퍼스 학생회관 3층 $` </span> <div></div>
    </div>
  );
};

export default MealPage;
