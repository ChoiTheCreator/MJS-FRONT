/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Comment = (props) => {
  return (
    <div
      css={css`
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 12px; 
      `}
    >
      <div css={css`
        display: flex;
        align-items: center;
        gap: 8px;
      `}>
        <img
          src="https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg"
          alt="임시 이미지"
          css={css`width: 38px; height: 38px; border-radius: 14px;`} />
        <span css={css`
          font-size: 16px;
          font-weight: 700;
          margin: 4px;
        `}>
          {props.userName}
        </span>
        <span css={css`font-size: 14px; margin: 4px; color: red;`}>
          작성일
        </span>
        <span css={css`font-size: 14px; margin: 4px; color: #999;`}>
          {`좋아요 ${props.likeCount}`}
        </span>
      </div>
      <span>
        {props.content}
      </span>
    </div>
  );
}

export default Comment;
