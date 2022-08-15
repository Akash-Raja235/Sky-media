

const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    updateLoading: false,
  },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, error: false };

    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };
    case "UPDATING_START":
      return { ...state, updateLoading: true, error: false };
    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        error: false,
      };

    case "UPDATING_FAIL":
      return { ...state, updateLoading: true, error: true };

    case "LOG_OUT":
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
        updateLoading: false,
      };

    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      };

    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      };

    default:
      return state;
  }
};

export default authReducer;







// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     authData:null,
//     loading:false,
//     error:false,
//     uploading:false

// }

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     authStart: (state, action) => {
//       state.authData = null;
//       state.loading = true;
//       state.error = false;
//     },
//     authSuccess: (state, action) => {
//        localStorage.setItem('profile',JSON.stringify({...action?.payload}))
//       state.authData = action.payload;
//       state.loading = false;
//       state.error = false;
//     },
//     authFail: (state, action) => {
//       state.authData = null;
//       state.loading = false;
//       state.error = true;
//     },

//     updatingStart: (state) => {
//       state.uploading = true;
//       state.error = false;
//     },
//     updatingSuccess: (state,action) => {
//       localStorage.setItem('profile',JSON.stringify({...action?.payload}))
//       state.authData = action.payload;
//       state.uploading = false;
//       state.error = false;
//     },
//     updatingFail:(state)=>{
//        state.uploading = false;
//        state.error = true;
//     },
//      logoutAction: (state) => {
//       localStorage.clear();
//       state.authData = null;
//       state.loading = false;
//       state.error = false;
//     },

//     followUserAction:(state,action)=>{
//     // return{...state,authData:{...state.authData,user:{...state.authData.user},following:[...state.authData.user.following,action.payload]}}
//         state.authData.user.following = [...state.authData.user.following,action.payload]
  
//     },
    
//     unFollowUserAction:(state,action)=>{
//     //  return {...state,authData:{...state.authData,user:{...state.authData.user,following:[...state.authData.user.following.filter((personId)=>personId !==action.payload)]}}
//      state.authData.user.following=[...state.authData.user.following.filter((personId)=>personId !==action.payload)]
//     }
   
//   }
// }); 


// export const {
//   authStart,
//   authSuccess,
//   authFail,
//   logoutAction,
//   updatingStart,
//   updatingSuccess,
//   updatingFail,
//   followUserAction,
//   unFollowUserAction,
// } = authSlice.actions;
// export default authSlice.reducer


