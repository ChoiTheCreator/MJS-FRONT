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
    color: gray;
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

  // 데이터를 날짜별로 그룹화하여 하나의 행(row)으로 만듭니다.
  const tableData = useMemo(() => {
    if (!mealData || mealData.length === 0) return [];

    //MealData는 3가지 속성을 가진 배열임 (date, menuCategory, meals)

    const grouped = mealData.reduce((acc, item) => {
      const { date, menuCategory, meals } = item;

      //처음에 acc에는 값이 없다. 따라서 누적합 객체의 date속성에 저런 객체 타입을 초기화 한다.
      if (!acc[date]) {
        acc[date] = { date, breakfast: '', lunch: '', dinner: '' };
      }

      const mealString = meals.join(', '); //데이터에서 fetching 되는 meals라는 값이 배열을 ,로 구분자로 하나의 문자열로 만들어주는게 join()임
      if (menuCategory === 'BREAKFAST') {
        acc[date].breakfast = mealString;
      } else if (menuCategory === 'LUNCH') {
        acc[date].lunch = mealString;
      } else if (menuCategory === 'DINNER') {
        acc[date].dinner = mealString;
      }
      return acc;
    }, {});
    return Object.values(grouped); // 현재 acc[date] = { date, breakfast: '', lunch: '', dinner: '' };
  }, [mealData]);

  //4가지의 열 date, breakfast, lunch, dinnner
  const columns = useMemo(
    () => [
      { accessor: 'date', Header: 'Date' },
      { accessor: 'breakfast', Header: 'BREAKFAST' },
      { accessor: 'lunch', Header: 'LUNCH' },
      { accessor: 'dinner', Header: 'DINNER' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  const firstDate = tableData.length > 0 ? tableData[0].date : '';
  const lastDate = tableData.length > 0 ? tableData[4].date : '';

  // 오늘 날짜 가져오기 (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  const formatDate = (dateString) => {
    const parts = dateString.split(' ')[0].split('.');
    //03.10 (월) 을 03 10 (공백 기준으로 먼저 나누고, 03.10 (월)
    //그 이후 .으로 나누면 03 10 이라는 값이 배열에 박힘 마지막에 (월)은 버려짐

    const date = new Date();
    const year = date.getFullYear(); //현재년도

    //2025-03-10 (이런 형식을 갖추기 위해 padStart(앞에다가 pad를 댄다))
    const compareDate = `${year}-${parts[0].padStart(
      2,
      '0'
    )}-${parts[1].padStart(2, '0')}`;

    return compareDate;
  };

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
      ) : tableData.length === 0 ? (
        <div>식단 정보가 없습니다.</div>
      ) : (
        // 정해진 props 값 by useTable({columns,data:tableData})
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} {...column.getHeaderProps()}>
                    {/* 위에서 정의한 column 객체의 Header를 렌더할땐 이리한다. */}
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const rowData = row.original; //tableDate ORG
              const compareDate = formatDate(rowData.date);
              const isToday = today === compareDate;
              compareDate === console.log('오늘 날짜는', compareDate);
              console.log('Row Data:', rowData);

              return (
                <tr
                  key={rowData.date}
                  {...row.getRowProps()}
                  className={isToday ? 'highlight' : ''}
                >
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
