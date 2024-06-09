import { useState, useEffect } from 'react'
import { selectLoggedInUser } from './features/auth/authSlice.js'
import { fetchItemsByUserIdAsync } from './features/cart/counterSlice.js';
import Protected from './features/auth/component/Protected.jsx'
import Loginpage from './pages/Loginpage'
import SignupPage from './pages/SignupPage.jsx'
import { Route, Routes, Link, Navigate } from 'react-router-dom'
import AdminOrdersPage from './pages/AdminOrderPage.jsx';
import Home from './pages/Home.jsx'
import CartPage from './pages/CartPage.jsx'
import ProductDetailsPage from './pages/ProductDetailsPage.jsx'
import Checkout from './pages/Checkout.jsx'
import { useDispatch, useSelector } from 'react-redux'
import Logout from './features/auth/component/Logout.jsx';
import ForgotPasswordPage from './pages/ForgetPasswordPage.jsx';
import PageNotFound from './pages/404.jsx';
import OrderSuccessPage from './pages/OrderSuccessPage.jsx';
import UserOrdersPage from './pages/UserOrdersPage.jsx';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import ProtectedAdmin from './features/admin/components/ProtectedAdmin.jsx'
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage.jsx';
function App() {
  // const [token,setToken]=useState(null);
  // const [id,setId]=useState(null);
  // useEffect(()=>{
  //   const storedToken = localStorage.getItem('token');
  //   const storedId = localStorage.getItem('id');
  //   if (storedToken && storedId) {
  //     setToken(storedToken);
  //     setId(storedId);
  //   }
  // },[])
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  const token = localStorage.getItem('token');
    const id= localStorage.getItem('id');
   
  useEffect(() => {
    const token = localStorage.getItem('token');
    const id= localStorage.getItem('id');
    console.log("in use effect after refresh in app.js")
    if (id&&token) {
      dispatch(fetchItemsByUserIdAsync(id))
      dispatch(fetchLoggedInUserAsync(id))
    }
  }, []);
  useEffect(() => {
    console.log("in use effect due to saved data in app.js")
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Protected>
          <Home />
        </Protected>}></Route>
        <Route path='/cart' element={<Protected>
          <CartPage />
        </Protected>}></Route>
        <Route path='/login' element={<Loginpage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/product-details/:id' element={<Protected><ProductDetailsPage /> </Protected>}></Route>
        <Route path='/checkout' element={<Protected>
          <Checkout></Checkout>
        </Protected>}></Route>
        <Route path='/order-success/:id' element={<Protected><OrderSuccessPage></OrderSuccessPage></Protected>}></Route>
        <Route path='/orders' element={<Protected><UserOrdersPage></UserOrdersPage></Protected>}></Route>
        <Route path='/profile' element={<Protected><UserProfilePage></UserProfilePage></Protected>}></Route>
        <Route path='/logout' element={<Logout></Logout>}></Route>
        <Route path='/forgot-password' element={<ForgotPasswordPage></ForgotPasswordPage>}></Route>
        <Route path='/admin' element={<ProtectedAdmin>
          <AdminHome></AdminHome>
        </ProtectedAdmin>}></Route>
        <Route path='/admin/product-detail/:id' element={<ProtectedAdmin>
          <AdminProductDetailPage></AdminProductDetailPage>
        </ProtectedAdmin>}></Route>
        <Route path='/admin/product-form' element={<ProtectedAdmin>
          <AdminProductFormPage></AdminProductFormPage>
        </ProtectedAdmin>}></Route>
        <Route path='/admin/product-form/edit/:id' element={<ProtectedAdmin>
          <AdminProductFormPage></AdminProductFormPage>
        </ProtectedAdmin>}></Route>
        <Route path='/admin/orders' element={<ProtectedAdmin>
          <AdminOrdersPage></AdminOrdersPage>
        </ProtectedAdmin>}></Route>



      <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
    </Routes >
    {
      !id&&!token&&(<><Navigate to='/login'></Navigate></>)
    }

    </>
  )
}

export default App
