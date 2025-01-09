import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

export default function ProfileCard({ userId, name, email, profileImage }) {
  return (
    <div>
      <Avatar userId={userId} profileImage={profileImage} />
      <Link to={`/profile/${userId}`} >
        <p>{name}</p>
      </Link>
      <p>{email}</p>
    </div>
  );
}
