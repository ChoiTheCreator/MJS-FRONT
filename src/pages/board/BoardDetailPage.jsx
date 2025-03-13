/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import MarkdownViewer from "../../components/MarkdownViewer";
import { deleteBoardContent, getBoardContent } from '../../api/boardApi';
import { LuEye, LuHeart, LuMessageSquare } from "react-icons/lu";
import Comment from '../../components/Comment';
import { getBoardComments, postBoardComment } from '../../api/commentApi';
import LoadingComponent from '../../components/util/LoadingComponent';
import { toast } from 'react-toastify';

const BoardDetailPage = () => {
  const navigate = useNavigate();
  const { uuid } = useParams(); // URL 파라미터 활용
  const [content, setContent] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const commentBox = useRef(null);
  const iconSize = 16;

  const handleSubmitComment = async () => {
    if (loading) {
      toast.error('잠시 기다려주세요')
      return
    }

    setLoading(true)
    try {
      const response = await postBoardComment(uuid, "abcde", commentBox.current.value)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async () => {
    if (loading) {
      toast.error('잠시 기다려주세요')
      return
    }

    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      setLoading(true)
      try {
        const response = await deleteBoardContent(uuid)
        navigate('/board')
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSubmitLike = async () => {
    if (loading) {
      toast.error('잠시 기다려주세요')
      return
    }

    setLoading(true)
    toast.info('게시글에 좋아요를 표시했습니다!')
    setLoading(false)
  }

  useEffect(() => {
    const getData = async () => {
      setPageLoading(true);
      try {
        const responseContent = await getBoardContent(uuid);
        const responseComments = await getBoardComments(uuid);
        console.log('getBoardContent 결과', responseContent.data);
        console.log('getBoardComments 결과', responseComments.data);
        setContent(responseContent.data);
        setComments(responseComments.data);
      } catch (error) {
        toast.error(error.message)
      } finally {
        setPageLoading(false);
      }
    }
    getData();
  }, [uuid])

  if (pageLoading) {
    return (
      <div css={pageStyle}>
        <div css={errorStyle}>
          <LoadingComponent message='게시글을 불러오는 중입니다' />
        </div>
      </div>
    )
  } else if (content) {
    return (
      <div css={pageStyle}>
        <div css={css`display: flex; flex-direction: column;`}>
          <div css={css`display:flex; justify-content: space-between; border-bottom: 1px solid #ccc;`}>
            <span css={css`font-size: 1.5em; font-weight: bold; padding: 4px; margin: 8px; flex: 1;`}>
              {content.title}
            </span>
            <div css={css`display: flex; flex-direction: row; gap: 8px;`}>
              <button css={textButtonStyle}>
                수정
              </button>
              <button css={textButtonStyle} onClick={handleDeletePost}>
                삭제
              </button>
            </div>
          </div>
          <div css={css`margin: 8px; display: flex; justify-content: flex-end; gap: 20px;`}>
            <span css={css`display: flex; align-items: center; gap: 8px; color: #D00392;`}>
              <LuHeart size={iconSize} />
              {content.likeCount === undefined ? "null" : content.likeCount}
            </span>
            <span css={css`display: flex; align-items: center; gap: 8px; color: #0386D0;`}>
              <LuMessageSquare size={iconSize} />
              {comments.totalElements}
            </span>
            <span css={css`display: flex; align-items: center; gap: 8px; color: #1103D0;`}>
              <LuEye size={iconSize} />
              {content.viewCount}
            </span>
          </div>
        </div>
        <div css={css`padding: 16px;`}>
          <MarkdownViewer>
            {content.content}
          </MarkdownViewer>
        </div>
        <div css={css`width: 100%;`}>
          <div css={css`
            padding: 16px; 
            display: flex; 
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;`}>
            <div css={css`display: flex; gap: 16px; align-items: center;`}>
              <img
                src="https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg"
                alt="임시 이미지"
                css={css`width: 48px; height: 48px; border-radius: 20px;`} />
              <div css={css`display: flex; flex-direction: column; gap: 4px;`}>
                <span css={css`
                font-size: 18px;
                font-weight: 700;`}>
                  작성자
                </span>
                <span>
                  {(() => {
                    const datePart = content.publishedAt.substring(0, 10).replace(/-/g, "/");
                    const timePart = content.publishedAt.substring(11, 16);
                    return `${datePart} ${timePart}`;
                  })()}
                </span>
              </div>
            </div>
            <button
              css={css`
                background-color: #D00392;
                color: white;
                text-align: center;
                border-radius: 10px;
                border: none;
                padding: 10px 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px; `}
              onClick={handleSubmitLike}>
              <LuHeart />
              좋아요
            </button>
          </div>
          <div css={css`
            display: flex; 
            flex-direction: column; 
            padding: 16px;
            gap: 16px;
          `}>
            <span>
              댓글 수 {comments.totalElements}
            </span>
            <div css={css`padding: 8px; gap: 16px;`}>
              {comments.content.map((comment) => (
                <Comment
                  key={comment.commentUUID}
                  userName={comment.nickname}
                  likeCount={comment.likes}
                  content={comment.content} />
              ))}
            </div>
            <div css={css`
              margin: 16px;
              padding: 16px;
              display: flex;
              flex-direction: row;
              gap: 16px;
            `}>
              <div css={css`display: flex; flex-direction: row;`}>
                <div css={css`display:flex; flex-direction: column; gap: 16px;`}>
                  <img
                    src="https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg"
                    alt="임시 이미지"
                    css={css`width: 64px; height: 64px; border-radius: 20px;`} />
                  <div css={css`display: flex; flex-direction: row; gap: 4px;`}>
                    <input
                      type='checkbox'
                      onChange={(e) => setIsHidden(e.target.checked)} />
                    <span>
                      익명
                    </span>
                  </div>
                </div>
              </div>
              <input
                css={css`
                  flex: 1;
                  padding: 16px;
                  border: 1px solid #ccc;
                  border-radius: 8px;
                  background-color: #f9f9f9;
                  `}
                type='text'
                placeholder='댓글을 남겨주세요'
                ref={commentBox} />
              <button
                css={css`
                  background-color: #0d2864;
                  color: white;
                  text-align: center;
                  border-radius: 10px;
                  border: none;
                  padding: 10px 20px;
                  cursor: pointer;  
              `}
                onClick={handleSubmitComment}
              >
                남기기
              </button>
            </div>
          </div>
        </div>
      </div >
    );
  } else {
    return (
      <div css={pageStyle}>
        <div css={errorStyle}>
          <h1>게시글을 찾을 수 없습니다.</h1>
          <button css={backButtonStyle} onClick={() => navigate('/board')}>
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }
};

export default BoardDetailPage;

const pageStyle = css`
  width: 100%;
  height: 100%;
  padding: 3%;
  gap: 40px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 16px;
`;

const errorStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const textButtonStyle = css`
  background: transparent;
  color: gray;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
