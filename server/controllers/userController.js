
import userModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// get a user
const getUser = async(req,res)=>{
    const {id} = req.params

    try {
        const user = await userModel.findById(id)
      if(!user){
        return res.status(400).json({message:"user not found"})
      }

     const { password, ...otherDetails } = user._doc;
         return res
           .status(200)
           .json({ message: "user get successfully", otherDetails });


    } catch (error) {
        res.status(500).json({message:error.message})
    }

}
// get All users

const getAllUser = async (req, res) => {
 

  try {
   let users = await userModel.find()
     if (!users) {
       return res.status(400).json({ message: "users not found" });
     }

   users= users.map((user)=>{
    const {password, ...otherDetails} = user._doc
    return otherDetails
   })
    return res
      .status(200)
      .json({ message: "all users get  successfully", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// update a user
const updateUser = async(req,res)=>{
    const {id} = req.params;

    const {_id,currentUserAdminStatus,password} = req.body;

     if((id === _id) || currentUserAdminStatus){
       
        try {

            if(password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password,salt)
            }
           const user = await userModel.findByIdAndUpdate(id, req.body,{new:true})
           const token = jwt.sign({username:user.username,userId:user._id},process.env.SECRET_KEY,{expiresIn:'1d'})
            res.status(200).json({message:"update successfully",user,token})

        } catch (error) {
           res.status(500).json({ message: error.message });  
        }
    }else{
        res.status(403).json({message:"Access Denied"})
    }


}


// delete user


const deleteUser =async(req,res)=>{

const {id} = req.params;
const { currentUserId, currentUserAdminStatus } = req.body;
if((id === currentUserId) || currentUserAdminStatus){

    try {
        
         const user = await userModel.findByIdAndDelete(id);
         res.status(200).json({ message: " user deleted successfully !"});

    } catch (error) {
      res.status(500).json({ message: error.message });    
    }

}else{
    res.status(403).json({ message: "Access Denied" });
}

}

// follow a user
const followUser = async(req,res)=>{
    const {id} = req.params
    const {_id} = req.body

    if (id === _id) {
      res
        .status(403)
        .json({ message: "You can only follow others, not yourSelf!" });
    } else {
      try {
        const followUser = await userModel.findById(id);
        const followingUser = await userModel.findById(_id);

        if (!followUser.followers.includes(_id)) {
          await followUser.updateOne({ $push: { followers: _id } });
          await followingUser.updateOne({ $push: { following: id } });
          res.status(200).json({ message: "user followed!" });
        } else {
          res.status(403).json({
            message: "you already follwed",
          });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

}

// unfollow a user

 const unFollowUser = async(req,res)=>{
    const {id} = req.params
    const {_id} = req.body

    if(id === _id){
        res.status(403).json({message:"you cant unfollow yourself"})
    }else{
       
        try {
            
            const followUser = await userModel.findById(id)
            const followingUser = await userModel.findById(_id)

            if(followUser.followers.includes(_id)){
                await followUser.updateOne({$pull:{followers:_id}})
                await followingUser.updateOne({$pull:{following:id}})
                res.status(200).json({message:"user unfollowed"})
            }else{
                 res
                   .status(403)
                   .json({ message: "user is not followed by you" });
            }

        } catch (error) {
          res.status(500).json({ message: error.message });   
        }

    }
 }

export {getAllUser, getUser, updateUser, deleteUser, followUser, unFollowUser };