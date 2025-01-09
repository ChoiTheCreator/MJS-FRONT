import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/UserProfile.css';
import dummyProfileImage from '../assets/dummy_profile.png';
import Avatar from './Avatar';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(dummy); // Replace this with the actual
  const [profileImage, setProfileImage] = useState(dummyProfileImage);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className='profile-image-wrapper'>
          <Avatar src={profileImage} alt="Profile" className="profile-image" />
        </div>
        <div className="profile-info">
          <h3>{profileData.name}</h3>
          <p>{profileData.email}</p>
        </div>
      </div>
      <div className="profile-links">
        <Link className="profile-button" to={"https://msi.mju.ac.kr"}>MSI</Link>
        <Link className="profile-button" to={"https://myicap.mju.ac.kr"}>MYiCap</Link>
        <Link className="profile-button" to={"https://mcloud.mju.ac.kr"}>Office365</Link>
        <Link className="profile-button" to={`/profile/${profileData.id}`}>MyPage</Link>
      </div>
    </div>
  );
};

export default UserProfile;

const dummy = {
  id: 1,
  name: '남퍼플',
  email: 'skaqhfk00@mju.ac.kr',
};
