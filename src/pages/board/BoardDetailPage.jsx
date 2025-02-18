/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MarkdownViewer from "../../components/MarkdownViewer";
import { getBoardContent } from '../../api/boardApi';
import { Eye, Heart, MessageSquareText } from 'lucide-react';

const BoardDetailPage = () => {
  const { uuid } = useParams(); // URL 파라미터 활용
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const iconSize = 16;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await getBoardContent(uuid);
        console.log(response.data);
        setContent(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [uuid])

  if (loading) {
    return (
      <div css={pageStyle}>
        <div>
          <h1>
            게시글을 불러오는 중입니다.
          </h1>
        </div>
      </div>
    )
  } else if (content) {
    return (
      <div css={pageStyle}>
        <div css={titleStyle}>
          <h2 className='title-wrapper'>{content.title}</h2>
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
        <div css={contentStyle}>
          <MarkdownViewer>
            {content.content}
          </MarkdownViewer>
        </div>
        <div css={commentStyle}>

        </div>
      </div>
    );
  } else {
    return (
      <div css={pageStyle}>
        <p>게시글을 찾을 수 없습니다.</p>
        <button css={backButtonStyle} onClick={() => navigate('/board')}>
          뒤로 가기
        </button>
      </div>
    );
  }
};

export default BoardDetailPage;

const pageStyle = css`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2%;
  display: flex;
  flex-direction: column;

  background-color: white;
`;

const titleStyle = css`
  display: flex; 
  flex-direction: row;  
  border-bottom: 1px solid #e0e0e0;

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
    align-items: center;
  }

  span {
    display: flex;
    align-items: center;
    margin: 8px;
  }
  .icon {
    margin: 4px;
  }
`;

const contentStyle = css`
  padding: 32px;
`;

const commentStyle = css`

`;

const postInfoStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #777;
`;

const backButtonStyle = css`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #001f5c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #003cb3;
  }
`;
