import React, { useEffect } from 'react'
import {loadStripe} from '@stripe/stripe-js';
import { selectCurrentOrder } from '../features/order/orderSlice';
import { useSelector } from 'react-redux';


const CardPaymentPage = () => {

const currentOrder=useSelector(selectCurrentOrder)
console.log("current order is ",currentOrder);
 const makepayment=async()=>{
        const stripe=await loadStripe("pk_test_51PPfQMP8WnHYzfx7oFyIgbcNwH56MS4b8DJDIlPEmEIchwSFXZADfMTV0od1NeuGieOCgLDZWY1gklusMZ8EIu0o005CGUzA1w")
        const response=await fetch('https://e-commerce-backend-alpha-one.vercel.app/api/create-checkout-session',{
          method:"POST",
          header:{
            "content-type":"application/json"
          },
          body:JSON.stringify(currentOrder)
         })
         const session=await response.json();
         const result=stripe.redirectToCheckout({
          sessionId:session.id
         })
         if(result.error){
          console.log("result.error is ",result.error);
         }


     }
    
    {currentOrder?(makepayment()):null}

    
  return (
    <div>
      This is card payment page
    </div>
  )
}

export default CardPaymentPage
