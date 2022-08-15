

import './FollowersCard.css'
import User from '../user/User';
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {getAllUsers} from '../../api/userRequest'
const FollowersCard = () => {

const [persons,setPersons] = useState([])
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(()=>{
  const fetchPersons = async () => {
  const {data} = await getAllUsers()
  setPersons(data.users)

 
  };

  fetchPersons()
  },[])
  

  return (
    <div className="FollowersCard">
      <h3 style={{ marginLeft: "1rem" }}>People You May know</h3>

      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
      })}
    </div>
  ); 
}

export default FollowersCard