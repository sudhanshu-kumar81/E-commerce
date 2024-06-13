import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { resetOrder } from '../features/order/orderSlice';
import { resetCreateorderStatus } from '../features/order/orderSlice';
const FailedOrderPage = () => {
    const params = useParams() 
    const dispatch = useDispatch();
    useEffect(()=>{
     dispatch(resetCreateorderStatus())
     // reset currentOrder
     dispatch(resetOrder())
    },[])
 
   return (
     <>
     {!params.id &&  <Navigate to='/' replace={true}></Navigate>}
     <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
       <div className="text-center">
         <p className="text-base font-semibold text-red-600">Order failed </p>
         <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-900 sm:text-5xl">
           Order Number #{params?.id}
         </h1>
         <div className="mt-10 flex items-center justify-center gap-x-6">
           <Link
             to="/cart"
             className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
           >
             Try Again
           </Link>
         </div>
       </div>
     </main>
     </>
   );
 }

export default FailedOrderPage
