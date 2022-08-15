
import userModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// Register new user
const registerUser = async(req,res)=>{

const {username,password,firstname,lastname} = req.body;
if(!username || !password || !firstname || !lastname){
    return res.status(400).json({message:"All field are required"})
}

const olduser = await userModel.findOne({username})
if (olduser) {
  return res
    .status(400)
    .json({ message: "user already registerd , Go for login" });
}

const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(password, salt);
const newUser = new userModel({ username, password:hashPassword, firstname, lastname });

 

  try {
    
   const user = await newUser.save()
    const token = jwt.sign({username:user.username, id:user._id},process.env.SECRET_KEY,{expiresIn:'1d'})
    res.status(200).json({message:"register successfully",user,token})
  } catch (error) {
    res.status(500).json({message:error.message})
   
  }

}


// login user

const loginUser = async(req,res)=>{
const {username,password}= req.body;
 
if(!username || !password){
  return res.status(400).json({ message: "All field are required" });   
}

try {
    const user = await userModel.findOne({username})

    if(!user){
       return res.status(400).json({ message: "this user not exist" });   
    }
   const isMatch = await bcrypt.compare(password,user.password)
   if(!isMatch){
     return res.status(400).json({ message: "invalid credential" });
   }
   const token = jwt.sign(
     { username: user.username, id: user._id },
     process.env.SECRET_KEY,
     { expiresIn: "1d" }
   );
  return res.status(200).json({ message: "user successfully logged In", user,token });
} catch (error) {
     res.status(500).json({ message: error.message });
}

}




export { registerUser, loginUser };
