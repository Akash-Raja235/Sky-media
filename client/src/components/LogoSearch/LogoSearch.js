

import React from 'react'
import './LogoSearch.css'
import Logo from '../../img/sky-facebook-logo.png'
import SearchIcon from "@mui/icons-material/Search";
const LogoSearch = () => {
  return (
    <div className="LogoSerach">
      <div className="logo_image">
        <img src={Logo} alt="" />
      </div>
      <div className="search">
        <input type="text" placeholder="#Explore" />
        <div className="s_icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default LogoSearch