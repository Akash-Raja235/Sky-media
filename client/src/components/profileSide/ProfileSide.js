

import React from 'react'
import FollowersCard from '../folloersCard/FollowersCard';
import ProfileCard from '../profilecard/ProfileCard';
import "./ProfileSide.css";
const ProfileSide = () => {
  return (
    <div className='ProfileSide'>
      <ProfileCard location='homepage'/>
      <FollowersCard/>
    </div>
  )
}

export default ProfileSide