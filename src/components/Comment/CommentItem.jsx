/** @jsxImportSource @emotion/react */
import Avatar from '@components/Avatar';
import { css } from '@emotion/react';

export default function CommentItem(props) {
  function formatDate(input) {
    const [datePart, timePart] = input.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');

    const formattedYear = year.slice(2);
    return `${formattedYear}/${month}/${day} ${hour}:${minute}`;
  }

  const createdAt = formatDate(props.createdAt)

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
      <div css={css`display: flex; align-items: center; gap: 8px;`}>
        <Avatar size={38} />
        <span css={css`font-size: 16px; font-weight: 700; margin: 4px;`}>
          {props.userName}
        </span>
        <span css={css`font-size: 14px; margin: 4px; color: #999;`}>
          {createdAt}
        </span>
        <span css={css`font-size: 14px; margin: 4px; color: #999;`}>
          {`좋아요 ${props.likeCount}`}
        </span>
      </div>
      <span>
        {props.content}
      </span>
    </div>
  )

}
