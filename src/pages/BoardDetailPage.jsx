/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const pageContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
`;

const postContainerStyle = css`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 80%;
  max-width: 800px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const titleStyle = css`
  font-size: 1.8rem;
  font-weight: bold;
  color: #001f5c;
  margin-bottom: 15px;
`;

const contentStyle = css`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
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

const BoardDetailPage = () => {
  const { postId } = useParams(); // URL 파라미터 활용
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  // 더미 데이터 (실제 API 연동 시 변경)
  const dummyPosts = [
    {
      id: '1',
      title: '자전거 타고 꿈 가는 방법 알려준다 ㅋㅋ',
      content: '여기서부터 본문 내용이 들어갑니다. 긴 글을 입력해 주세요.',
      likes: 5,
      comments: 15,
      views: 234,
    },
    {
      id: '2',
      title: '명지대 앞 맛집 추천 좀 해줘요!',
      content: '이 근처에 괜찮은 식당 있을까요? 추천 부탁드립니다.',
      likes: 10,
      comments: 30,
      views: 512,
    },
    {
      id: '3',
      title: '시험기간에 공부하기 좋은 카페 어디?',
      content: '조용하고 집중하기 좋은 카페 추천 좀 해주세요.',
      likes: 8,
      comments: 20,
      views: 400,
    },
  ];

  // 게시글 ID에 해당하는 더미 데이터 가져오기
  useEffect(() => {
    const foundPost = dummyPosts.find((p) => p.id === postId);
    if (foundPost) {
      setPost(foundPost);
    } else {
      setPost(null); // 해당 ID가 없을 경우
    }
  }, [postId]);

  if (!post) {
    return (
      <div css={pageContainerStyle}>
        <p>게시글을 찾을 수 없습니다.</p>
        <button css={backButtonStyle} onClick={() => navigate('/board')}>
          뒤로 가기
        </button>
      </div>
    );
  }

  return (
    <div css={pageContainerStyle}>
      <div css={postContainerStyle}>
        <h1 css={titleStyle}>{post.title}</h1>
        <p css={contentStyle}>{post.content}</p>
        <div css={postInfoStyle}>
          <span>♥ {post.likes} </span>
          <span>💬 {post.comments} </span>
          <span>👁 {post.views} </span>
        </div>
        <button css={backButtonStyle} onClick={() => navigate('/board')}>
          뒤로 가기
        </button>
      </div>
    </div>
  );
};

export default BoardDetailPage;
