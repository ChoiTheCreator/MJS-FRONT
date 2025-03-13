/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { postBoardComment } from '../../api/commentApi'

export default function CommentForm({ uuid }) {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitComment = async () => {
    if (isLoading) {
      toast.error('잠시 기다려주세요')
      return
    }

    setIsLoading(true)
    try {
      const response = await postBoardComment(uuid, "abcde", content)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div css={css`margin: 16px; padding: 16px; display: flex; flex-direction: row; gap: 16px;`}>
      <div css={css`display: flex; flex-direction: row;`}>
        <div css={css`display:flex; flex-direction: column; gap: 16px;`}>
          <img
            src="https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg"
            alt="임시 이미지"
            css={css`width: 64px; height: 64px; border-radius: 20px;`} />
        </div>
      </div>
      <input
        css={css`flex: 1; font-size: 1rem; padding: 16px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;`}
        type='text'
        placeholder='댓글을 남겨주세요'
        onChange={(e) => setContent(e.target.value)} />
      <button
        css={css`background-color: #0d2864; color: white; text-align: center; border-radius: 10px; border: none; padding: 10px 20px; cursor: pointer;`}
        onClick={handleSubmitComment}
      >
        남기기
      </button>
    </div>
  )
}