

import mongoose from "mongoose";
import postModel from "../Models/postModel.js";

import userModel from '../Models/userModel.js'

// create post 

const createPost = async(req,res)=>{
    const {userId}= req.body;
    if(!userId){
        return res.status(400).json({ message: "userId is needed" });
    }
    const newPost = new postModel(req.body)


    try {
        

        await newPost.save()
        res.status(200).json({message:"post created",newPost})
    } catch (error) {
      res.status(500).json({message:error.message})  
    }
}


// get post

const getPost = async(req,res)=>{
  const {id} = req.params;
  try {
    
   const post = await postModel.findById(id)
   if(!post){
    return res.status(404).json({message:"post not found"})
   }else{

    res.status(200).json({message:"getting post done!", post})
   }

  } catch (error) {
      res.status(500).json({ message: error.message }); 
  }

}


// update post

const updatePost = async(req,res)=>{
    const {id} = req.params;
    const {userId} = req.body

   try {
    const post = await postModel.findById(id)
    if(post.userId === userId){
        await post.updateOne({$set:req.body})
        res.status(200).json({ message: "post updated"});
    }else{
        return res.status(403).json({ message: "you can only update your post" }); 
    }

   } catch (error) {
     res.status(500).json({ message: error.message }); 
   }

}




// delete post

const deletePost = async(req,res)=>{
    
     const { id } = req.params;
     const { userId } = req.body;

     try {
        
        const post = await postModel.findById(id);
          
          if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json({ message: "post deleted" });
          } else {
            return res
              .status(403)
              .json({ message: "you can only delete your post" });
          }

     } catch (error) {
         res.status(500).json({ message: error.message }); 
     }
}



// likes/ dislikes post

  const likesPost = async(req,res)=>{
     const { id } = req.params;
     const { userId } = req.body;

     try {
        const post = await postModel.findById(id);

      
        if(!post.likes.includes(userId)){
         await post.updateOne({$push:{likes:userId}})
          res.status(200).json({ message: "post liked",post });
        }else{
           await post.updateOne({ $pull: { likes: userId } });
           res.status(200).json({ message: "post disliked",post });  
        }
     } catch (error) {
       res.status(500).json({ message: error.message });  
     }
  }


  // get timeline post

  const getTimeLinePost = async(req,res)=>{
     const userId  = req.params.id;
     try {
        
        const currentUserPost = await postModel.find({userId:userId})
        const followingPost = await userModel.aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(userId),
            },
          },

          {
            $lookup: {
              from: "posts",
              localField: "following",
              foreignField: "userId",
              as: "followingPost",
            },
          },
          {
            $project: {
              followingPost:1,
              _id:0
            },
          },
        ]);
        res.status(200).json(currentUserPost.concat(followingPost[0].followingPost)
        .sort((a,b)=>{
            return b.createdAt -a.createdAt
        }))
     } catch (error) {
      res.status(500).json({ message: error.message });   
     }

  }

export {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likesPost,
  getTimeLinePost,
};