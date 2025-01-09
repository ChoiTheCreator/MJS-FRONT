import React from 'react';
import ProfileCard from '../components/ProfileCard';
import UserProfile from '../components/UserProfile';

export default function TestPage() {
  const dummyProfile = {
    id: 1,
    name: "남퍼플",
    email: "22@mju.ac.kr",
    profileImage: "path_to_profile_image" // 여기에 실제 프로필 이미지 경로를 넣으세요.
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* <ProfileCard
        userId={dummyProfile.id}
        name={dummyProfile.name}
        email={dummyProfile.email}
        profileImage={dummyProfile.profileImage}
      /> */}
      {/* <p>test page</p> */}
      <UserProfile />
    </div>
  );
}
