

import './Auth.css'
import Logo from '../../img/sky-facebook-logo.png'
import {Stack,TextField,Button,Typography, Alert} from '@mui/material'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import { logIn, signUp } from '../../actions/AuthAction'
const Auth = () => {
const dispatch = useDispatch();
 const loading = useSelector((state) => state.authReducer.loading);
 
 
 const [isSignUp,setIsSignhUp] = useState(true) 
 const [inputData, setInputData] = useState({
   firstname: "",
   lastname: "",
   username: "",
   password: "",
   confirm_password: "",
 }); 

 const [showError,setShowError] = useState({
  status:false,
  type:"",
  message:""
 }) 

 const handleChange=(e)=>{
  setInputData({ ...inputData,[e.target.name]:e.target.value });
 }

 const resetForm =()=>{
   setShowError({
     status: false,
     type: "",
     message: "",
   });
   setInputData({
     firstname: "",
     lastname: "",
     username: "",
     password: "",
     confirm_password: "",
   });

 }

 const handleSubmit=async(e)=>{
  e.preventDefault()

  if(isSignUp)
  {
  
    if (
      inputData.firstname &&
      inputData.lastname &&
      inputData.username &&
      inputData.password &&
      inputData.confirm_password
    ) {
      if (inputData.password === inputData.confirm_password) {
        // Api call
         dispatch(signUp(inputData))
         resetForm()
       
       
      } else {
        setShowError({
          status: true,
          type: "error",
          message: "password & confirm password not match",
        });
      }
    } else {
      setShowError({
        status: true,
        type: "error",
        message: "All field are required",
      });
    }

  }
    else{
      setIsSignhUp(false)
     if (inputData.username && inputData.password) {
       // Api call
       dispatch(logIn(inputData))
       resetForm()
     
     } else {
       setShowError({
         status: true,
         type: "error",
         message: "All field are required",
       });
     }

    }
    
  
   

 }
  return (
    <div className="Auth">
      <div className="auth_left">
        <img src={Logo} alt="" />
      </div>
      {/* sign up  */}
      <Stack
        component="form"
        onSubmit={handleSubmit}
        spacing={2}
        sx={{
          ml: 2,
          boxShadow: "2px 5px 5px 2px lightgray",
          p: 1,
          borderRadius: "10px",
        }}
      >
        <Stack>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {isSignUp ? " Sign Up" : "Log In"}
          </Typography>
          {showError.status ? (
            <Alert severity={showError.type}>{showError.message}</Alert>
          ) : (
            ""
          )}
        </Stack>

        {isSignUp && (
          <Stack direction="row">
            <TextField
              onChange={handleChange}
              name="firstname"
              placeholder="first name"
              value={inputData.firstname}
            />
            <TextField
              onChange={handleChange}
              name="lastname"
              placeholder="last name"
              value={inputData.lastname}
            />
          </Stack>
        )}

        <Stack>
          <TextField
            onChange={handleChange}
            name="username"
            placeholder="username"
            type="email"
            value={inputData.username}
          />
        </Stack>
        <Stack direction="row">
          <TextField
            onChange={handleChange}
            name="password"
            placeholder="password"
            type="password"
            value={inputData.password}
          />

          {isSignUp && (
            <TextField
              onChange={handleChange}
              name="confirm_password"
              placeholder="confirm password"
              type="password"
              value={inputData.confirm_password}
            />
          )}
        </Stack>
        <Stack>
          <Button variant="contained" color="secondary" type="submit" disabled={loading}>
            {loading?"loading..": isSignUp ? "SignUp" : "sign In"}
          </Button>
        </Stack>
        <Stack>
          <Typography
            onClick={() => {
              setIsSignhUp((prev) => !prev);
              resetForm();
            }}
            variant="subtitle2"
            sx={{
              textAlign: "center",
              cursor: "pointer",
              "&:hover": { bgcolor: "red" },
            }}
          >
            {isSignUp
              ? "Are you signed up? Login"
              : "Don't have account? Sign up"}
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
}

export default Auth






