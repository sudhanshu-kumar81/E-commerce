import React from 'react'
import ProductDetails from '../features/product-list/ProductDetails'
import Navbar from '../features/navbar/Navbar'
import Footer from '../features/common/Footer'

const ProductDetailsPage = () => {
  return (
    <div>
        <Navbar>
        <ProductDetails/>
        </Navbar>
        <Footer/>
     
    </div>
  )
}

export default ProductDetailsPage
