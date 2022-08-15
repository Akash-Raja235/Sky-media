import React from 'react'
import './ProfileCard.css'

import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
const ProfileCard = ({location}) => {

 const { user } = useSelector((state) => state.authReducer.authData);
 const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="ProfileCard">
      <div className="image">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCoverPicture.jpg"
          }
          alt=""
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfilePicture.png"
          }
          alt=""
        />
      </div>
      <div className="profile_name">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.workAt ? user.workAt : "write your bio here!"}</span>
      </div>

      <div className="follow_status">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>post</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span className="profile_link">
          <NavLink
            style={{ textDecoration: "none" }}
            to={`/profile/${user._id}`}
          >
            Profile
          </NavLink>
        </span>
      )}
    </div>
  );
}

export default ProfileCard


