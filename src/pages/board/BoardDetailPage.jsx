/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MarkdownViewer from "../../components/MarkdownViewer";
import { getBoardContent } from '../../api/boardApi';
import { Eye, Heart, MessageSquareText } from 'lucide-react';
import Comment from '../../components/Comment';

const BoardDetailPage = () => {
  const { uuid } = useParams(); // URL 파라미터 활용
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const iconSize = 16;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const responseContent = await getBoardContent(uuid);
        console.log(responseContent.data);
        setContent(responseContent.data);


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
      <PageContainer>
        <ErrorMessageWrapper>
          <h1>
            게시글을 불러오는 중입니다.
          </h1>
        </ErrorMessageWrapper>
      </PageContainer>
    )
  } else if (content) {
    return (
      <PageContainer>
        <div css={css`display: flex; flex-direction: column;`}>
          <div css={css`display:flex; justify-content: space-between; border-bottom: 1px solid #ccc;`}>
            <h2 css={css`padding: 4px; flex: 1;`}>
              {content.title}
            </h2>
            <div css={css`display: flex; flex-direction: row;`}>
              <TextButton>
                수정
              </TextButton>
              <TextButton>
                삭제
              </TextButton>
            </div>
          </div>
          <div css={css`display: flex; justify-content: flex-end;`}>
            <DetailInfo css={css`color: #D00392;`}>
              <Heart size={iconSize} />
              {content.likeCount === undefined ? "null" : content.likeCount}
            </DetailInfo>
            <DetailInfo css={css`color: #0386D0;`}>
              <MessageSquareText size={iconSize} />
              {content.commentCount === undefined ? "null" : content.commentCount}
            </DetailInfo>
            <DetailInfo css={css`color: #1103D0;`}>
              <Eye size={iconSize} />
              {content.viewCount === undefined ? "null" : content.viewCount}
            </DetailInfo>
          </div>
        </div>
        <div css={css`padding: 32px;`}>
          <MarkdownViewer>
            {content.content}
          </MarkdownViewer>
        </div>
        <div css={css`width: 100%; border: 1px solid black;`}>
          <div css={css`
            padding: 8px; 
            display: flex; 
            border: 1px solid black; 
            align-items: center;
            border-bottom: 1px solid #ccc;`}>
            <img
              src="https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMjM1/MDAxNzExMzgyMDQ3Mzcy.KEHy_SCpkdrmxR5snlfM-O_KBK6eZMUcYqUhdjpaAgUg.2--tdZ4zRKNuXl01U19DwC6onpvn7HERFNt2bD-tDhwg.PNG/5.png?type=w400"
              alt="임시 이미지"
              css={css`width: 64px; height: 64px; border-radius: 20px; margin: 8px;`} />
            <div css={css`display: flex; flex-direction: column;`}>
              <span css={css`
                font-size: 18px;
                font-weight: 700;
                margin: 4px;`}>
                작성자
              </span>
              <span css={css`margin: 4px;`}>
                2025년 3월 1일
              </span>
            </div>
          </div>
          <div css={css`display: flex; flex-direction: column; padding: 8px;`}>
            <span>
              댓글 수 10
            </span>
            <Comment />
          </div>
        </div>
      </PageContainer>
    );
  } else {
    return (
      <PageContainer>
        <ErrorMessageWrapper>
          <h1>게시글을 찾을 수 없습니다.</h1>
          <button css={backButtonStyle} onClick={() => navigate('/board')}>
            뒤로 가기
          </button>
        </ErrorMessageWrapper>
      </PageContainer>
    );
  }
};

export default BoardDetailPage;

const ErrorMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 4%;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 16px;
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

const TextButton = styled.button`
  background: transparent;
  color: gray;
  border: none;
  cursor: pointer;
  &:hover {
  text-decoration: underline;
  }
`

const DetailInfo = styled.span`
  display: flex;
  align-items: center;
  margin: 8px;

  & > * {
    margin: 4px;
  }
`
