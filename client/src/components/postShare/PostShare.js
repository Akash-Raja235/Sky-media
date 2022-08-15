

import React, { useRef, useState } from 'react'
import './PostShare.css'

import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Button, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/uploadAction';
const PostShare = () => {
const loading = useSelector((state) => state.postReducer.uploading);
const dispatch = useDispatch()
const [image, setImage] = useState(null)
const desc = useRef()
const imageRef =useRef()
  const { user } = useSelector((state) => state.authReducer.authData);
const onImageChange =(e)=>{
    if(e.target.files && e.target.files[0]){
      let img = e.target.files[0]
        setImage(img);
    }
}

const resetImageData =()=>{
  setImage(null)
  desc.current.value=""
}

const handleSubmit=(e)=>{
  e.preventDefault()
  const newPost = {
    userId:user._id,
    desc:desc.current.value
  }

  if(image){
    const data= new FormData()
    const filename =Date.now()+image.name
    data.append('name',filename)
    data.append("file",image)
    newPost.image = filename
    
    try {
      dispatch(uploadImage(data))
    } catch (error) {
      
    }
  }

  dispatch(uploadPost(newPost))
  resetImageData()
}
// server public image reciving
 const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="PostShare">
      <div className="post_top">
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfilePicture.png"
          }
          alt=""
          className="post_image"
        />
        <input
          ref={desc}
          required
          className="whast_info"
          type="text"
          placeholder="what's happning"
        />
      </div>

      <div className="post_option">
        <div className="optopn">
          <IconButton
            sx={{ color: "green" }}
            onClick={() => imageRef.current.click()}
          >
            <PhotoLibraryIcon />
          </IconButton>
          photo
        </div>
        <div className="optopn">
          <IconButton sx={{ color: "blue" }}>
            <PlayCircleOutlineRoundedIcon />
          </IconButton>
          Video
        </div>
        <div className="optopn">
          <IconButton sx={{ color: "orange" }}>
            <AddLocationIcon />
          </IconButton>
          Location
        </div>
        <div className="optopn">
          <IconButton sx={{ color: "pink" }}>
            <CalendarMonthIcon />
          </IconButton>
          shedule
        </div>
        <div className="optopn">
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? "uploading.." : "share"}
          </Button>
        </div>
        <div className="hidden_image">
          <input
            type="file"
            accept="image/*"
            ref={imageRef}
            onChange={onImageChange}
          />
        </div>
      </div>
      {image && (
        <div className="previewImage">
          <IconButton
            sx={{ position: "absolute", top: "0.5rem", right: "1rem" }}
            onClick={() => setImage(null)}
          >
            <CloseIcon />
          </IconButton>
          <img src={URL.createObjectURL(image)} alt="" />
        </div>
      )}
    </div>
  );
}

export default PostShare