/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getBoardComments } from '../../api/commentApi';
import LoadingComponent from '../util/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import CommentItem from './CommentItem';
import { toast } from 'react-toastify';
import CommentForm from './CommentForm';

export default function Comment({ uuid }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [comments, setComments] = useState(null)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const response = await getBoardComments(uuid)
        console.log('getBoardComments 결과', response.data)
        setComments(response.data)
      } catch (error) {
        setIsError(true)
        console.error(error)
        toast.error('댓글을 불러오는 중 문제가 발생했습니다')
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [uuid])

  if (isLoading) {
    return (
      <div css={css`flex: 1; padding: 2rem; display: flex; justify-content: center;`}>
        <LoadingComponent message='댓글을 불러오는 중입니다' />
      </div>
    )
  } else if (isError) {
    return (
      <div css={css`flex: 1; padding: 2rem; display: flex; justify-content: center;`}>
        <span css={css`padding: 2rem; font-size: 1.5rem; font-weight: bold;`}>
          문제가 발생했습니다
        </span>
      </div>
    )
  } else {
    return (
      <div css={css`display: flex; flex-direction: column; padding: 16px; gap: 16px;`}>
        <span>
          댓글 수 {comments.length}
        </span>
        <div css={css`padding: 8px; gap: 16px;`}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.commentUUID}
              userName={comment.nickname}
              createdAt={comment.createdAt}
              likeCount={comment.likeCount}
              content={comment.content} />
          ))}
        </div>
        <CommentForm uuid={uuid} />
      </div>
    )
  }
}
