

import ProfileLeft from '../../components/profileLeft/ProfileLeft'
import './Profile.css'
import Header from '../../components/header/Header'
import ProfileCard from '../../components/profilecard/ProfileCard';
import PostSide from '../../components/postside/PostSide';
import RightSide from '../../components/rightSide/RightSide';
const Profile = () => {
  return (
    <div className="Profile">
      <Header />
      <div className="profile_area">
        <ProfileLeft />
        <div className="post_area">
          <ProfileCard location="profilePage" />
          <PostSide />
        </div>
        <div className="profile_right">
          <RightSide />
        </div>
      </div>
    </div>
  );
}

export default Profile