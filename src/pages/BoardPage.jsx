/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';

const boardPageStyle = css`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: calc(100vh - 150px);
  padding: 0;
  margin: 0;
  overflow-y: hidden;
  background-color: #f9f9f9;
`;

const mainSectionStyle = css`
  flex-grow: 1;
  width: 86%;
  max-width: 2000px;
  margin: 20px auto;
  padding: 40px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  position: relative;
`;

const postItemStyle = css`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  transition: box-shadow 0.2s ease-in-out;
  background-color: #f9f9f9;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const BoardPage = () => {
  const navigate = useNavigate();

  // ✅ `BoardDetailPage`에서도 이 데이터를 동일하게 사용하도록 설정
  const posts = [
    {
      id: '1',
      title: '자전거 타고 꿈 가는 방법 알려준다 ㅋㅋ',
      content: `
        <h1>H1의 크기 입니다</h1>
        <h2>H2의 크기 입니다</h2>
        <h3>H3의 크기 입니다</h3>
        <img src="https://via.placeholder.com/600x300" alt="더미 이미지"/>
        <p>글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.</p>
      `,
      likes: 5,
      comments: 15,
      views: 234,
    },
    {
      id: '2',
      title: '명지대 앞 맛집 추천 좀 해줘요!',
      content: `<p>이 근처에 괜찮은 식당 있을까요? 추천 부탁드립니다.</p>`,
      likes: 10,
      comments: 30,
      views: 512,
    },
  ];

  return (
    <div css={boardPageStyle}>
      <div css={mainSectionStyle}>
        <h2>자유 게시판</h2>
        {posts.map((post) => (
          <div
            key={post.id}
            css={postItemStyle}
            onClick={() => navigate(`/board/${post.id}`, { state: post })}
          >
            <h3>{post.title}</h3>
            <p>{post.content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 50)}...</p>
            <div className="post-info">
              <span>♥ {post.likes}</span>
              <span>💬 {post.comments}</span>
              <span>👁 {post.views}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
