import React from 'react'

import PostSide from '../../components/postside/PostSide';
import ProfileSide from '../../components/profileSide/ProfileSide';
import RightSide from '../../components/rightSide/RightSide';

import './Home.css'

import Header from '../../components/header/Header';
const Home = () => {


  return (
    <div className="Home">
     
      <Header/>
      <div className="home_area">
        <ProfileSide />
        <PostSide />
        <RightSide />
      </div>
    </div>
  );
}

export default Home