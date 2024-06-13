import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { selectLoggedInStatus } from "../../user/userSlice";
import { selectUserInfo } from "../../user/userSlice";
function Protected({ children }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log("in protected");
    const user = useSelector(selectUserInfo)
    const userStatus = useSelector(selectLoggedInStatus)
    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        if (!id && !token) {
          console.log("returning from protected for no token and id");
          navigate('/login', { replace: true });
        } 
        if (userStatus === 'rejected'&&!user) {
          console.log("Navigating to login page from Protected component");
          navigate('/login', { replace: true });
        }
      }, [user, userStatus, navigate]);
      return user ? children : null;

}
export default Protected;