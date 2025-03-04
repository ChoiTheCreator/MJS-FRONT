/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Comment = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 8px;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <img
          src="https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMjM1/MDAxNzExMzgyMDQ3Mzcy.KEHy_SCpkdrmxR5snlfM-O_KBK6eZMUcYqUhdjpaAgUg.2--tdZ4zRKNuXl01U19DwC6onpvn7HERFNt2bD-tDhwg.PNG/5.png?type=w400"
          alt="임시 이미지"
          css={css`width: 38px; height: 38px; border-radius: 14px;`} />
        <div css={css`display: flex; align-items: center;`}>
          <span css={css`
            font-size: 16px;
            font-weight: 700;
            margin: 4px;`}
          >
            작성자
          </span>
          <span css={css`font-size: 14px; margin: 4px;`}>
            2025년 3월 1일
          </span>
        </div>
      </div>
      <span>
        ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ누구냐 진짜 ㅋㅋ 개또라이새끼 ㅋㅋ
      </span>
    </div>
  );
}

export default Comment;
