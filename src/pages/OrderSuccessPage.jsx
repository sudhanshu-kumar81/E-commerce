import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../features/user/userSlice";
import { resetOrder } from "../features/order/orderSlice";

function OrderSuccessPage() {
   const params = useParams() 
   const dispatch = useDispatch();
   const user = useSelector(selectUserInfo);

   useEffect(()=>{
    // reset cart
    dispatch(resetCartAsync(user.id))
    // reset currentOrder
    dispatch(resetOrder())
   },[dispatch,user])

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="text-center max-w-md mx-auto"> {/* Center content and limit width */}
          <p className="text-base font-semibold text-indigo-600 mb-2">
            Order Successfully Placed
          </p>
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Order Number #{params?.id}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-7">
            You can check your order in My Account<br /> {/* Line break on smaller screens */}
            My Orders
          </p>
          <div className="mt-6 sm:mt-8">
            <Link
              to="/"
              className="inline-block rounded-md bg-indigo-600 px-4 py-2.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccessPage;