import { useEffect, useState } from 'react'
import { Audio } from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromCartAsync, selectItems, updateCartAsync, } from './counterSlice';
import { NavLink } from 'react-router-dom'
import { selectCartStatus,selectCartError,resetCartStatusandError  } from './counterSlice';

import { discountedPrice } from '../../app/constants';
import Modal from '../common/Modal';
import {useAlert} from 'react-alert'
const Cart = () => {
  
  const alert=useAlert()
  const [selectedItem,setSelectedItem]=useState(0)
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(null);
  
  const handleRemove = (e, id) => {
    console.log("it is handleremove product id", id);
    dispatch(deleteItemFromCartAsync(id))
  }
  const handleQuantity = (e, item) => {
    const updatedItem={id:item.id,product:item.product.id,user:item.user.id ,quantity: +e.target.value }
    // console.log("it is handlequantity e.target.value", e.target.value);
    dispatch(updateCartAsync(updatedItem));
  };
  const items = useSelector(selectItems);
  const totalAmount = items.reduce((amount, item) => discountedPrice(item.product) * item.quantity + amount, 0)
  const totalItems = items.reduce((total, item) => item.quantity + total, 0)
  const [orderPossible,setOrderPossible]=useState(false);
  useEffect(()=>{
    setSelectedItem(items.length)
   const isOrderPossible = items.every(item =>item.product.stock >= item.quantity);
   console.log("is Order Possible",isOrderPossible);
   setOrderPossible(isOrderPossible);
   if(items.length===0){
    setOrderPossible(false);
   }
  },[dispatch,items]);
  const status=useSelector(selectCartStatus);
  const error=useSelector(selectCartError);
  useEffect(()=>{
   if(status==='rejected'){
    alert.error(error);
    dispatch(resetCartStatusandError())
   }else if(status==='fulfilled'){
    alert.success(error);
    dispatch(resetCartStatusandError())
   }
  },[dispatch,status])
  const [isLoading,setIsLoading]=useState(true)
  

  return (
    <>
      {
       items?(<>
      <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="border-t border-gray-200 px-4 sm:px-6 lg:px-8 md:p-5">
          <h2 className='text-4xl font-bold tracking-tight text-gray-900 my-12'>Cart</h2>
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {items&&items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.href}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">${discountedPrice(item.product)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label htmlFor='quantity' className='inline mr-5 text-sm font-medium leading-6 text-gray-900'>
                          Qty
                        </label>

                        <select onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      <div className='text-blue-600 mt-1 font-semibold'><p>stock:{item.product.stock}</p></div>
                     
                      </div>
                      
                      <div className="flex">
                     
                      <Modal
                            title={`Delete ${item.product.title}`}
                            message="Are you sure you want to delete this Cart item ?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={(e) => handleRemove(e, item.id)}
                            cancelAction={()=>setOpenModal(null)}
                            showModal={openModal === item.id}
                          ></Modal>     
                        <button
                          onClick={(e) => {setOpenModal(item.id)}}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex my-2 justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalItems} items</p>
          </div>

          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
           



          {
            orderPossible?( <NavLink
              to='/checkout'
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </NavLink>):(
              <NavLink
              className="flex items-center justify-center rounded-md border border-transparent bg-gray-400 px-6 py-3 text-base font-medium text-white shadow-sm cursor-not-allowed"
              disabled
            >
             {selectedItem?(<>out of stock</>):(<>Missing Cart items?</>)}
            </NavLink>
            )
          }
           
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              {' '}
              <NavLink to='/'>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
        </>):(<></>)
      }
    </>
  )
}
export default Cart;