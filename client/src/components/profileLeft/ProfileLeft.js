

import FollowersCard from '../folloersCard/FollowersCard'
import InfoCard from '../infoCard/InfoCard'
import './ProfileLeft.css'
const ProfileLeft = () => {
  return (
    <div className="ProfileLeft">
       <InfoCard/>
       <FollowersCard/>
    </div>
  )
}

export default ProfileLeft