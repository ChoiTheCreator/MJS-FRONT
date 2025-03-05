/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaRegUser } from "react-icons/fa";

const Avatar = ({ src = FaRegUser, alt = 'Avatar', size = 40, style, ...props }) => {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: '20%',    // 원형으로 만들기 위해
    objectFit: 'cover',     // 이미지의 비율을 유지하며 채움
    ...style,               // 외부에서 전달한 추가 스타일 적용
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        style={avatarStyle} {...props} />
    </>
  );
}

export default Avatar;
