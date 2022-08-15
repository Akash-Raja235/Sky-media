import React, { useState } from 'react'
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/userAction';

const User = ({person}) => {

const { user } = useSelector((state) => state.authReducer.authData);

const [following, setFollowing] = useState(person.followers.includes(user._id))
    const dispatch = useDispatch()
const handleFollow =()=>{
    following
      ? dispatch(followUser(person._id, user))
      : dispatch(unFollowUser(person._id, user));

      setFollowing(!following)
}


  


 const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="follow_list">
      <div>
        <Avatar
          src={
           person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + "defaultProfilePicture.png"
          }
        />

        <div className="info">
          <span className="name">{person.firstname}</span>
          <span className="username">{person.username}</span>
        </div>
      </div>
      <div>
        <Button
        onClick={handleFollow}
        color={following? 'primary':'secondary'}
         variant="contained">{following ?"unfollow":"follow"}</Button>
      </div>
    </div>
  );
}

export default User