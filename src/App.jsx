import { useState, useEffect } from 'react'
import { selectUserInfo } from './features/user/userSlice';
import { fetchItemsByUserIdAsync } from './features/cart/counterSlice.js';
import Protected from './features/auth/component/Protected.jsx'
import Loginpage from './pages/Loginpage'
import SignupPage from './pages/SignupPage.jsx'
import { selectCartStatus,resetCartStatusandError } from './features/cart/counterSlice.js';
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
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import { selectCartFetchStatus } from './features/cart/counterSlice.js';
import FailedOrderPage from './pages/FailedOrderPage.jsx';
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo)
  // const status=useSelector(selectCartFetchStatus)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const id= localStorage.getItem('id');
    console.log("in use effect after refresh in app.js")
    if (id&&token) {
      dispatch(fetchItemsByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  }, []);
  //login
  useEffect(() => {
    const token=localStorage.getItem('token');
    console.log("in use effect due in user is ",user);
    if (token) {
      dispatch(fetchItemsByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  }, [dispatch,user?.id]);

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
  <Route path='/reset-password' element={<ResetPasswordPage></ResetPasswordPage>}></Route>
        <Route path='/order-success/:id' element={<Protected><OrderSuccessPage></OrderSuccessPage></Protected>}></Route>
        <Route path='/order-failed' element={<Protected><FailedOrderPage></FailedOrderPage></Protected>}></Route>
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

    </>
  )
}

export default App
