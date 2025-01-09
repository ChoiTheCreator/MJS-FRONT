import { Link } from "react-router-dom";
import dummyProfileImage from '../assets/dummy_profile.png';
import { useState } from "react";

export default function Avatar({ userId }) {
  const [profileImage, setProfileImage] = useState(dummyProfileImage);

  // useEffect(() => { userId로 profileImage 받아오기 }

  return (
    <Link to={`/profile/${userId}`} >
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={profileImage}
          alt="profile"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            aspectRatio: '1/1', // 정사각형 비율 설정
            borderRadius: '50%' // 모서리 round
          }} />
        {/* <p>남퍼플</p> */}
      </div>
    </ Link>
  );
}
