/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

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
  return (
    <div css={mealPlanStyle}>
      <h4>오늘의 식단 | 점심</h4>
      <ul>
        <li>자장밥, 순두부김치찌개</li>
        <li>맛초킹닭강정, 야채볶음</li>
        <li>배추김치, 매실차</li>
      </ul>
    </div>
  );
};

export default MealPlan;
