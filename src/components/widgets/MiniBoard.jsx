/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../util/LoadingComponent';
import { getBoardContents } from '../../api/boardApi';

export default function MiniBoard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [contents, setContents] = useState(null)

  useEffect(() => {
    const getBoardData = async () => {
      setLoading(true)
      try {
        const response = await getBoardContents()
        setContents(response.data.content)
        console.log(response.data.content)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getBoardData()
  }, [])

  return (
    <div css={css`display: flex; flex-direction: column;`}>
      <div css={css`
          padding: 2%; 
          border-bottom: 1px solid #ccc; 
          display: flex; 
          flex-direction: row; 
          justify-content: space-between;
          align-items: center;
        `}>
        <span css={css`color: #0d2864; font-size: 1.5rem; font-weight: 700;`}>
          자유게시판
        </span>
        <span
          css={css`cursor: pointer;`}
          onClick={() => navigate('/board')}
        >
          더보기
        </span>
      </div>
      {loading ? (
        <div css={css`display: flex; justify-content: center; align-items: center;`}>
          <LoadingComponent message='게시판 정보를 불러오는 중' />
        </div>
      ) : !contents ? (
        <div css={css`display: flex; justify-content: center; align-items: center;`}>
          <h1>
            텅
          </h1>
        </div>
      ) : (
        <div css={css`
            padding: 4% 1%;
            display: flex;
            flex-direction: column;
            gap: 4px;
          `}>
          {contents.map((content) => (
            <div
              css={css`
                  margin: 1%; 
                  padding: 3%; 
                  gap: 2%;
                  display: flex;
                  align-items: center;
                  border-bottom: 1px solid #ccc; 
                  cursor: pointer;
                  transition: background-color 0.3s ease;
                  &:hover {
                    background-color: #f0f0f0;  
                  }
                `}
              onClick={() => navigate(`/board/${content.uuid}`)}
            >
              <HotBadge />
              <span>
                {content.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function HotBadge() {
  return (
    <div
      css={css`
        padding: 0.1rem 0.5rem;
        border-radius: 16px;
        display: flex; 
        justify-content: center; 
        align-items: center;
        background: #0d2864;
      `}
    >
      <span
        css={css`
          color: white; 
          font-size: 0.8rem;
        `}
      >
        HOT
      </span>
    </div>
  )
}
