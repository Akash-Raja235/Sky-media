
import * as PostApi from '../api/postRequest'
export const getTimeLinePost =(id)=>async(dispatch)=>{
     dispatch({ type: "RETREIVING_START" });
    try {
        
        const {data} = await PostApi.getTimeLinePost(id);
      
      dispatch({ type: "RETREIVING_SUCCESS", data: data });
    } catch (error) {
       dispatch({ type: "RETREIVING_FAIL" });
        return error
    }
}


