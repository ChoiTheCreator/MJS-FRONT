/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getBoardContents } from '../../api/boardApi';
import { Eye, Heart, MessageSquareText } from 'lucide-react';

const BoardListPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const iconSize = 14;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await getBoardContents(page, size);

        setContents(response.data.content);
        console.log(response.data.content);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [page, size]);

  // const PostTitle =

  const navigate = useNavigate();
  return (
    <div css={pageStyle}>
      <div css={pageHeadingStyle}>
        <h1>자유 게시판</h1>
        <Link to="/board/write">
          <button>
            <FaPen />
            글쓰기
          </button>
        </Link>
      </div>
      <div css={pageContentsStyle}>
        {contents.map((content) => (
          <div
            onClick={() => navigate(`/board/${content.uuid}`)}
            className='content'
            key={content.uuid}>
            <div className='title-wrapper'>
              <h3>{content.title}</h3>
              <p>{content.content.length > 40 ? content.content.slice(0, 40) + " ..." : content.content}</p>
            </div>
            <div className='info-wrapper'>
              <span>
                <Heart className='icon' size={iconSize} />
                {content.likeCount === undefined ? "null" : content.likeCount}
              </span>
              <span>
                <MessageSquareText className='icon' size={iconSize} />
                {content.commentCount === undefined ? "null" : content.commentCount}
              </span>
              <span>
                <Eye className='icon' size={iconSize} />
                {content.viewCount === undefined ? "null" : content.viewCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
};

export default BoardListPage;

const pageStyle = css`
  padding: 2%;
`;

const pageHeadingStyle = css`
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;

  h1 {
    color: #001f5c;
    margin: 4px;
  }

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background-color: #001f5c;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;

    &:hover {
      background-color: #003cb3;
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;

const pageContentsStyle = css`
  display: flex; 
  flex-direction: column;  
  margin: 8px;

  .content {
    width: 100%;
    height: auto;
    margin: 8px;
    padding: 4px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    border-bottom: 1px solid #e0e0e0;
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    }
    
    .title-wrapper {
      padding: 4px; 
      flex: 1; 
      display: flex; 
      flex-direction: column;
    }
    
    .info-wrapper {
      flex: 0 0 auto; 
      display: flex; 
      flex-direction: row; 
      align-items:center;
    }
    
    h3 {
      margin: 8px;
    }
    p {
      margin: 8px;
    }
    span {
      display: flex;
      align-items: center;
      margin: 8px;
    }
    .icon {
      margin: 4px;
    }
  }  
`;
