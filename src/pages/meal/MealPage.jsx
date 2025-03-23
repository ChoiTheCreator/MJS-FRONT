/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useMemo, useState } from 'react';
import { getWeeklyMenu } from '../../api/mealApi';
import LoadingComponent from '../../components/util/LoadingComponent';
import { useTable } from 'react-table';

const mealTableStyle = css`
  display: flex;
  flex-direction: column;
  width: 1280px;
  font-family: 'Arial', sans-serif;

  table {
    width: 100%;
    background-color: #ffffff;
    border-collapse: collapse;
    margin-top: 10px;
    border-radius: 10px;
    height: 50vh;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    color: black;
    text-align: center;
    vertical-align: middle;
    font-size: 17px;
  }

  th {
    background-color: #316090;
    color: white;
    font-weight: bold;
    padding: 17px;
  }

  tr:hover {
    background-color: #e6f7ff;
  }
  .highlight {
    background-color: #e6f7ff !important;
  }
`;

const mealTitleStyle = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
  strong {
    font-size: 20px;
    flex-direction: row;
    justify-content: start;
    color: black;
    margin-right: 15px;
  }

  span {
    color: gray;
    font-size: 17px;
  }
`;

const MealPage = () => {
  const [loading, setLoading] = useState(true);
  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const response = await getWeeklyMenu();
        console.log('API로부터 받은 mealData:', response);
        setMealData(response);
      } catch (error) {
        console.error('식단 불러오기 실패', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealData();
  }, []);

  const normalizedKey = (date) => date.split(' ')[0];

  //mealDate에는 현재 날짜별로 아침점심저녁 겹치게 나오니까, 중복제거
  const allDates = useMemo(() => {
    const dateSet = Array.from(new Set(mealData.map((item) => item.date)));
    return dateSet;
  }, [mealData]);

  const allDateKeys = allDates.map(normalizedKey);
  const transposedData = useMemo(() => {
    if (!mealData || mealData.length === 0) return [];

    const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER'];

    const table = mealTypes.map((mealType) => {
      //const row = { mealType }; //객체 축약 문법...

      const row = { mealType: mealType };

      //집합임
      allDates.forEach((date) => {
        const found = mealData.find(
          //같은 날+ 같은 카테고리인 mealData해서 find
          (item) => item.date === date && item.menuCategory === mealType
        );
        row[date] = found ? found.meals.join(', ') : '';
      });
      return row;
    });

    return table;
  }, [mealData, allDates]);

  console.log(transposedData);

  const transposedColumns = useMemo(() => {
    return [
      { accessor: 'mealType', Header: '' },
      //새로운 열은 이제 날짜임
      ...allDates.map((date) => ({
        accessor: date,
        Header: date,
      })),
    ];
  }, [allDates]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: transposedColumns, data: transposedData });

  const firstDate = allDates[0] || '';
  console.log('첫날', firstDate);
  const lastDate = allDates[4] || '';
  console.log('마지막날', lastDate);

  return (
    <div css={mealTableStyle}>
      <div css={mealTitleStyle}>
        <strong>식단 </strong>
        <span>인문캠퍼스 학생회관 3층 </span>
        <span style={{ marginLeft: '10px' }}>
          [{firstDate} - {lastDate}]
        </span>
      </div>
      {loading ? (
        <LoadingComponent message="식단 정보를 불러오고 있습니다." />
      ) : transposedData.length === 0 ? (
        <div>식단 정보가 없습니다.</div>
      ) : (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              console.log('ROW DATA:', row.original);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td key={cell.column.id} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MealPage;
