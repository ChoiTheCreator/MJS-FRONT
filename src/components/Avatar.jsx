/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import defaultAvatar from '../assets/avatar-default.jpeg'

const Avatar = ({ src = defaultAvatar, alt = 'UserAvatar', size = 32, style, ...props }) => {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    objectFit: 'cover',
    ...style,
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        style={avatarStyle}
        {...props} />
    </>
  )
}

export default Avatar
