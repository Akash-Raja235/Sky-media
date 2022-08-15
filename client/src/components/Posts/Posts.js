
import React, { useEffect } from 'react'
import './Posts.css'

import {useParams} from 'react-router-dom'
import Post from '../Post/Post'
import {useDispatch,useSelector} from 'react-redux'
import { getTimeLinePost } from '../../actions/postAction'
const Posts = () => {

  const dispatch = useDispatch()
  const params =  useParams()
  const { user } = useSelector((state) => state.authReducer.authData);
   let { posts, loading } = useSelector((state) => state.postReducer);

    useEffect(()=>{
      dispatch(getTimeLinePost(user._id))
      
    },[])

   if (!posts) return "No Posts";
   if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."  
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
}

export default Posts