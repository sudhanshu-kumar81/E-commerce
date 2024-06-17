import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { selectLoggedInStatus } from "../../user/userSlice";
import { selectUserInfo } from "../../user/userSlice";
function Protected({ children }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUserInfo)
    const userStatus = useSelector(selectLoggedInStatus)
    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        if (!id && !token) {
          navigate('/login', { replace: true });
        } 
        if (userStatus === 'rejected'&&!user) {
          navigate('/login', { replace: true });
        }
      }, [user, userStatus, navigate]);
      return user ? children : null;

}
export default Protected;