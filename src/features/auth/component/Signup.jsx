import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner'
import { useForm } from 'react-hook-form';
import { createUserAsync, resetStatusAndmessage } from '../../user/userSlice';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../user/userSlice';
import { selectUserStatus,selectUserMessage } from '../../user/userSlice';
const Signup = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const status=useSelector(selectUserStatus)
  useEffect(() => {
    if (status === 'fulfilled') {
      dispatch(resetStatusAndmessage());
      navigate('/login');
    }
  }, [status, navigate,dispatch]);

 

  const token=localStorage.getItem('token')
  const error=useSelector(selectUserMessage)
  const user = useSelector(selectUserInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const handleClick=(e)=>{
    e.preventDefault();
    dispatch(resetStatusAndmessage())
    navigate('/login');
  }
    return (
      <>
  
      {  status === 'pending' ? (<div className=" h-[100vh] flex items-center justify-center"><Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /></div>) : (<> {user&&token && <Navigate to="/" replace={true}></Navigate>}
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       <img
         className="mx-auto h-10 w-auto"
         src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
         alt="Your Company"
       />
       <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
         Create your account
       </h2>
     </div>
    
     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
       <form className="space-y-6" noValidate
       onSubmit={handleSubmit((data)=>{
        console.log("data for signup is ",data);
       dispatch(createUserAsync({ email: data.email, password: data.password,role:'user',address:[]}))
       })}>
         <div>
           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
             Email address
           </label>
           <div className="mt-2">
             <input
               id="email"
              {...register("email", { required: "email is required",pattern:{
                value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                message:"Email is not valid"
              }})}
               type="email"
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             />
             <p className='text-red-500 '>{errors?.email?.message}</p>
           </div>
         </div>
    
         <div>
           <div className="flex items-center justify-between">
             <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
               Password
             </label>
           </div>
           <div className="mt-2">
             <input
               id="password"
              {...register("password", { required: "password is required",pattern:{
                value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                message:`- at least 8 characters\n
                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                - Can contain special characters`
              } })}
               type="password"
              //  autoComplete="current-password"
              //  required
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             />
             <p className='text-red-500 '>{errors?.password?.message}</p>
           </div>
         </div>
         <div>
           <div className="flex items-center justify-between">
             <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
               confirm password
             </label>
           </div>
           <div className="mt-2">
             <input
               id="cpassword"
               {...register("cpassword", { required: " confirm password is required",validate:(value,formValues)=>value===formValues.password||"password not matched"})}
               type="password"
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             />
             <p className='text-red-500 '>{errors?.cpassword?.message}</p>
           </div>
         </div>
    
         <div>
           <button
             type="submit"
             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
           >
             Sign Up
           </button>
           {
            status==='rejected'&&<p className='text-red-500 '>{error}</p>
           }
           
         </div>
       </form>
    
       <p className="mt-10 text-center text-sm text-gray-500">
         Already a member?{' '}
         <NavLink onClick={(e)=>handleClick(e)}  to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
           Log in
         </NavLink>
       </p>
     </div>
    </div></>)}

      
 </>
    )
}
export default Signup;

