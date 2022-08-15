

import './Header.css'
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';
const Header = () => {

  const navigate = useNavigate()

  const goToHome=()=>{
    navigate('../home')
  }
  return (
    <div className="Header">
     
        <div>
          <LogoSearch />
        </div>
        <div> Sky FaceBook</div>
        <div className="Header_rightside">
          <IconButton color="secondary" onClick={goToHome}>
            <HomeIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <SmsOutlinedIcon />
          </IconButton>
        </div>
      </div>
   
  );
}

export default Header