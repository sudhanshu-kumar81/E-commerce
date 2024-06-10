import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";
import { signOutAsync } from "../../user/userSlice";
import { resetCartTemp } from "../../cart/counterSlice";


function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo)

    useEffect(()=>{
        dispatch(signOutAsync())
        dispatch(resetCartTemp())
        localStorage.removeItem('token');
        localStorage.removeItem('id');
    },[])

    // but useEffect runs after render, so we have to delay navigate part
    return ( 
        <>
        {!user && (<Navigate to='/login' replace={true}></Navigate>)}
        </>
     );
}

export default Logout;