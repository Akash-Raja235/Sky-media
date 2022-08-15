



const postReducer = (
  state = { posts: null, loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default postReducer;




// import { createSlice } from "@reduxjs/toolkit";


// const initialState = {
//   posts: [],
//   loading: false,
//   error: false,
//   uploading:false
// };

// export const postSlice = createSlice({
//   name: "postData",
//   initialState,
//   reducers: {
//     uploadStart: (state, action) => {
//         state.posts = [...state.posts];
//         state.loading=true
//         state.error=false
//         state.uploading= true;
//     },
//       uploadSuccess: (state, action) => {
//         localStorage.setItem("posts", JSON.stringify({ ...action?.payload }));
//         state.posts=[action.payload,...state.posts]
//         state.loading=false
//         state.error=false
//         state.uploading =false;
//     },
//       uploadFail: (state, action) => {
//         state.posts=[]
//         state.loading=false
//         state.error=true
//        state.uploading = false;
//     },
//   },
// });


// export const {uploadStart,uploadSuccess,uploadFail} = postSlice.actions
// export default postSlice.reducer