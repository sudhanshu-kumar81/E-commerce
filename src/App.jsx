import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Counter } from './features/counter/Counter'
import Loginpage from './pages/Loginpage'
import SignupPage from './pages/SignupPage.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Cart from './features/cart/Cart.jsx'
import CartPage from './pages/CartPage.jsx'
function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cart' element={<CartPage/>}></Route>
        <Route path='/login' element={<Loginpage/>}></Route>
        <Route path='/signup' element={<SignupPage/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
    </>
  )
}

export default App
