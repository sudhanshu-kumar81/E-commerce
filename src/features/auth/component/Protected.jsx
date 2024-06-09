import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {selectLoggedInUser} from '../authSlice'
import { useEffect,useState } from "react";
import { Grid } from "react-loader-spinner";
import { selectUserLoggedInstatus } from "../../user/userSlice";
import { selectUserInfo } from "../../user/userSlice";
function Protected({children}) {
    const user = useSelector(selectUserInfo)
    const FetchedStatus=useSelector(selectUserLoggedInstatus)
    
    if (FetchedStatus === 'pending') {
        <Grid
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper"
              />
          }
    
    if (FetchedStatus === 'fulfilled' && !user) {
        return <Navigate to='/login' replace={true} />; 
    }

    if (FetchedStatus === 'fulfilled' && user) {
        return children; // Render children if user data is available
    }
   
    return null;
    
    
}
export default Protected;