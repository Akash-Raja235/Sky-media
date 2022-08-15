

import React, { useState } from 'react'
import './Post.css'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/postRequest';

const Post = ({data}) => {
  
 const { user } = useSelector((state) => state.authReducer.authData);
 const [liked, setLiked] = useState(data.likes.includes(user._id));
  
    console.log(data)

 const [likes, setLikes] = useState(data.likes.length);
   


   const handleLikes = async() => {
     likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
   
 
  

  return (
    <div className="Post">
      <div className="post_img">
        <img
          src={
            data.image
              ? process.env.REACT_APP_PUBLIC_FOLDER + data.image
              : ""
          }
          alt=""
        />
      </div>
      <div className="reacttion">
        <IconButton onClick={handleLikes}>
          {liked? (
            <FavoriteBorderIcon sx={{color:"red"}}/>
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton>
          <SmsOutlinedIcon />
        </IconButton>
        <IconButton>
          <ShareOutlinedIcon />
        </IconButton>
      </div>
      <div>
        <span>{likes} likes</span>
      </div>
      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
}

export default Post