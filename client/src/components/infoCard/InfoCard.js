


import './InfoCard.css'
import CreateIcon from "@mui/icons-material/Create";
import { Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import ProfileModel from '../profileModel/ProfileModel';
import * as UserApi from '../../api/userRequest' 
import { logout } from '../../actions/AuthAction';
const InfoCard = () => {
   const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch()
  const params = useParams()
  const profileUserId = params.id
  const [profileUser,setProfileUser] = useState({})
   const { user } = useSelector((state) => state.authReducer.authData);
    
    useEffect(()=>{
     const fetchProfileUser = async()=>{
      if(profileUserId ===user._id){
        setProfileUser(user);
      
      }else{
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser);
        
      }
      
     }
     fetchProfileUser()
    },[user])

   const handleLogOut =()=>{
     dispatch(logout())
   }

  return (
    <div className="InfoCard">
      <div className="info_head">
        <h3>Profile Info</h3>
        {user._id === profileUserId ? (
          <>
            <IconButton onClick={() => setModalOpened(true)}>
              <CreateIcon />
            </IconButton>
            <ProfileModel
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </>
        ) : (
          ""
        )}
      </div>

      <div className="info_detail">
        <div className="profile_info">
          <span> Status :</span>
          <span> {profileUser.relationship}</span>
        </div>

        <div className="profile_info">
          <span> Lives in: </span>
          <span>{profileUser.livesin}</span>
        </div>

        <div className="profile_info">
          <span> works at: </span>
          <span>{profileUser.workAt}</span>
        </div>

        <Button
         onClick={handleLogOut}
         variant="contained" color="error">
          Log out
        </Button>
      </div>
    </div>
  );
}

export default InfoCard