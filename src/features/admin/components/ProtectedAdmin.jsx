import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../user/userSlice';
import { selectUserLoggedInstatus } from '../../user/userSlice';

function ProtectedAdmin({ children }) {
  const LoginAfterRefreshstatus=useSelector(selectUserLoggedInstatus)
  const user = useSelector(selectUserInfo);

  if (LoginAfterRefreshstatus==='fulfilled'&&!user||LoginAfterRefreshstatus==='rejected') {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (LoginAfterRefreshstatus==='fulfilled'&&user && user.role!=='admin') {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  if (LoginAfterRefreshstatus==='fulfilled'&&user && user.role==='admin') {
    return children;
  }
 
}

export default ProtectedAdmin;