import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../user/userSlice';
import { selectLoggedInStatus } from '../../user/userSlice';

function ProtectedAdmin({ children }) {
  const user = useSelector(selectUserInfo);

  
     if(!user){
      <Navigate to='/login'></Navigate>
     }
     if(user?.role==='admin'){
      <Navigate to='/'></Navigate>
     }
      return children
 
}

export default ProtectedAdmin;