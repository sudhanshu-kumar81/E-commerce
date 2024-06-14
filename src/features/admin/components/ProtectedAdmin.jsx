import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../user/userSlice';
import { selectLoggedInStatus } from '../../user/userSlice';
import { useEffect } from 'react';
import { useState } from 'react';

function ProtectedAdmin({ children }) {
  const [delayPassed,setDelayPassed]=useState(false);
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayPassed(true);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);
   
  
   if(delayPassed&&!user){
    return <Navigate to='/login'></Navigate>
   }
     
     if(user&&user?.role!=='admin'){
     return <Navigate to='/'></Navigate>
     }
      return children
 
}

export default ProtectedAdmin;