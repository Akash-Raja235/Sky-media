
import { Button, Modal, useMantineTheme } from "@mantine/core";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";
import './ProfileModel.css'

const ProfileModel = ({ modalOpened, setModalOpened,data }) => {
  const theme = useMantineTheme();

   const {password, ...otherData} = data;
 
   const [formData , setFormData] = useState(otherData)
   const [profileImage, setprofileImage] = useState(null)
   const [coverImage, setCoverImage] = useState(null)
   const dispatch = useDispatch()
   const params = useParams()
   const { user } = useSelector((state) => state.authReducer.authData);

   const hadleChange=(e)=>{
    
    setFormData({...formData,[e.target.name]:e.target.value})

   }

   const onImageChange = (e)=>{
    if(e.target.files && e.target.files[0]){
      let img = e.target.files[0]
     e.target.name === "profileImage" ? setprofileImage(img):setCoverImage(img)
    }
   
   }
    const handleSubmit=(e)=>{
      e.preventDefault()
      let UserData =formData
      if(profileImage){
        const data = new FormData()
        const fileName= Date.now()+profileImage.name
        data.append("name",fileName)
        data.append('file',profileImage)
        UserData.profilePicture =fileName
       
        try {
          dispatch(uploadImage(data));
        } catch (error) {
          return error
        }
      }
      if(coverImage){

        const data = new FormData();
        const fileName = Date.now() + coverImage.name;
        data.append("name", fileName);
        data.append("file", coverImage);
        UserData.coverPicture = fileName;

        try {
          dispatch(uploadImage(data));
        } catch (error) {
          return error
        }
      }
      dispatch(updateUser(params.id, UserData));
      setModalOpened(false)
    }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="30%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your Info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First name"
            onChange={hadleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last name"
            onChange={hadleChange}
            value={formData.lastname}
          />
        </div>
        <div className="full">
          <input
            type="text"
            className="infoInput"
            name="workAt"
            placeholder="Work at"
            onChange={hadleChange}
            value={formData.workAt}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="Lives in"
            onChange={hadleChange}
            value={formData.livesin}
          />
          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="country"
            onChange={hadleChange}
            value={formData.country}
          />
        </div>
        <div className="full">
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="Relationship Status"
            onChange={hadleChange}
            value={formData.relationship}
          />
        </div>
        <div className="button_area">
          <Button
            onChange={onImageChange}
            color="orange"
            style={{ marginLeft: "10px" }}
            component="label"
          >
            profile Image
            <input
              onChange={onImageChange}
              hidden
              type="file"
              name="profileImage"
            />
          </Button>
          <Button color="orange" style={{ margin: "10px" }} component="label">
            Cover Image
            <input
              onChange={onImageChange}
              hidden
              type="file"
              name="coverImage"
            />
          </Button>
          <Button onClick={handleSubmit} style={{ marginLeft: "20px" }} variant="contained">
            update
          </Button>
        </div>
      </form>
    </Modal>
  );
};




export default ProfileModel