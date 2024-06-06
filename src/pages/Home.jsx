import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product-list/ProductList'
import { Link } from 'react-router-dom'
import Footer from '../features/common/Footer'
const Home = () => {
  return (
    <div>
      <Navbar>
      <ProductList/>
      </Navbar>
      <Footer/>
     
    </div>
  )
}

export default Home
