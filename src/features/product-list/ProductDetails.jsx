

import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { addToCartAsync, selectItems } from '../cart/counterSlice';
import { selectUserInfo } from '../user/userSlice';
import { RadioGroup } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { discountedPrice } from '../../app/constants';
import { fetchProductByIdAsync, selectProductById, selectProductListfetchProductStatus } from '../product-list/productlistSlice';
import { selectProductListStatus } from '../product-list/productlistSlice';
import { Circles } from 'react-loader-spinner'
import { selectCartStatus,resetCartStatusandError } from '../cart/counterSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCartError } from '../cart/counterSlice';
import { useAlert } from 'react-alert';

// TODO: In server data we will add colors, sizes , highlights. to each product

const colors = [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
];
const sizes = [
  { name: 'XXS', inStock: false },
  { name: 'XS', inStock: true },
  { name: 'S', inStock: true },
  { name: 'M', inStock: true },
  { name: 'L', inStock: true },
  { name: 'XL', inStock: true },
  { name: '2XL', inStock: true },
  { name: '3XL', inStock: true },
];

const highlights = [
  'Hand cut and sewn locally',
  'Dyed with our proprietary colors',
  'Pre-washed & pre-shrunk',
  'Ultra-soft 100% cotton',
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// TODO : Loading UI  

export default function ProductDetail() {
  const productStatus=useSelector(selectProductListfetchProductStatus)
  const cartStatus=useSelector(selectCartStatus)
  const cartError=useSelector(selectCartError)
  const alert=useAlert()
  const navigate=useNavigate();
  const user = useSelector(selectUserInfo)
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const items=useSelector(selectItems)
  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);
  const handleCart = (e)=>{
    e.preventDefault();
    const index=items.findIndex((item)=>item.product.id===product.id)
   if(index===-1){
    const newItem={
      product:product.id,quantity:1,user:user.id
    }
    dispatch(addToCartAsync(newItem))
   }else{
    alert.error('Item Already Added');
   }
    
  }

  useEffect(() => {
    if (cartStatus === 'fulfilled') {
      dispatch(resetCartStatusandError())
      alert.success('Item added successfully');
      navigate('/cart');
    } else if (cartStatus === 'rejected') {
      alert.error(`Failed to add item: ${cartError}`);
      dispatch(resetCartStatusandError())
    }
  }, [cartStatus, cartError, alert, navigate]);

  return (
    <div className="bg-white">
      {
        productStatus==='rejected'&&(<><div className=' flex items-center bg-red-200 justify-center text-red-600 text-5xl'>Error</div><div className='h-[25vh] flex items-center bg-red-200 justify-center text-red-600 text-3xl'>Failed to load details</div></>)
      }
       {
  productStatus === 'pending' && (
    <div className=" h-[100vh] flex items-center justify-center">
    <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
    </div>
  )
}


      {product&&items && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {/* {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))} */}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[1]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[2]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.images[3]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-xl line-through tracking-tight text-gray-900">
               ${product.price}
              </p>
              <p className="text-3xl tracking-tight text-gray-900">
                ${discountedPrice(product)}
              </p>
              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? 'text-gray-900'
                            : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              'h-8 w-8 rounded-full border border-black border-opacity-10'
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              active ? 'ring-2 ring-indigo-500' : '',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked
                                      ? 'border-indigo-500'
                                      : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                onClick={(e)=>{handleCart(e)}}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


















// import React from 'react'

// const ProductDetails = () => {
//   return (
//     <>
//       <div class="bg-white">
//         <div class="pt-6">
//           <nav aria-label="Breadcrumb">
//             <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
//               <li>
//                 <div class="flex items-center">
//                   <a href="#" class="mr-2 text-sm font-medium text-gray-900">Men</a>
//                   <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
//                     <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//                   </svg>
//                 </div>
//               </li>
//               <li>
//                 <div class="flex items-center">
//                   <a href="#" class="mr-2 text-sm font-medium text-gray-900">Clothing</a>
//                   <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
//                     <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//                   </svg>
//                 </div>
//               </li>

//               <li class="text-sm">
//                 <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">Basic Tee 6-Pack</a>
//               </li>
//             </ol>
//           </nav>

//           {/* <!-- Image gallery --> */}
//           <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
//             <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
//               <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" alt="Two each of gray, white, and black shirts laying flat." class="h-full w-full object-cover object-center" />
//             </div>
//             <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
//               <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
//                 <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg" alt="Model wearing plain black basic tee." class="h-full w-full object-cover object-center" />
//               </div>
//               <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
//                 <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg" alt="Model wearing plain gray basic tee." class="h-full w-full object-cover object-center" />
//               </div>
//             </div>
//             <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
//               <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg" alt="Model wearing plain white basic tee." class="h-full w-full object-cover object-center" />
//             </div>
//           </div>

//           {/* <!-- Product info --> */}
//           <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
//             <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
//               <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Basic Tee 6-Pack</h1>
//             </div>

//             {/* <!-- Options --> */}
//             <div class="mt-4 lg:row-span-3 lg:mt-0">
//               <h2 class="sr-only">Product information</h2>
//               <p class="text-3xl tracking-tight text-gray-900">$192</p>

//               {/* <!-- Reviews --> */}
//               <div class="mt-6">
//                 <h3 class="sr-only">Reviews</h3>
//                 <div class="flex items-center">
//                   <div class="flex items-center">
//                     {/* <!-- Active: "text-gray-900", Default: "text-gray-200" --> */}
//                     <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
//                     </svg>
//                     <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
//                     </svg>
//                     <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
//                     </svg>
//                     <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
//                     </svg>
//                     <svg class="text-gray-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
//                     </svg>
//                   </div>
//                   <p class="sr-only">4 out of 5 stars</p>
//                   <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
//                 </div>
//               </div>

//               <form class="mt-10">
//                 {/* <!-- Colors --> */}
//                 <div>
//                   <h3 class="text-sm font-medium text-gray-900">Color</h3>

//                   <fieldset class="mt-4">
//                     <legend class="sr-only">Choose a color</legend>
//                     <div class="flex items-center space-x-3">
//                       {/* <!--
//                   Active and Checked: "ring ring-offset-1"
//                   Not Active and Checked: "ring-2"
//                 --> */}
//                       <label class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
//                         <input type="radio" name="color-choice" value="White" class="sr-only" aria-labelledby="color-choice-0-label" />
//                         <span id="color-choice-0-label" class="sr-only">White</span>
//                         <span aria-hidden="true" class="h-8 w-8 bg-white rounded-full border border-black border-opacity-10"></span>
//                       </label>
//                       {/* <!--
//                   Active and Checked: "ring ring-offset-1"
//                   Not Active and Checked: "ring-2"
//                 --> */}
//                       <label class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
//                         <input type="radio" name="color-choice" value="Gray" class="sr-only" aria-labelledby="color-choice-1-label" />
//                         <span id="color-choice-1-label" class="sr-only">Gray</span>
//                         <span aria-hidden="true" class="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"></span>
//                       </label>
//                       {/* <!--
//                   Active and Checked: "ring ring-offset-1"
//                   Not Active and Checked: "ring-2"
//                 --> */}
//                       <label class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
//                         <input type="radio" name="color-choice" value="Black" class="sr-only" aria-labelledby="color-choice-2-label" />
//                         <span id="color-choice-2-label" class="sr-only">Black</span>
//                         <span aria-hidden="true" class="h-8 w-8 bg-gray-900 rounded-full border border-black border-opacity-10"></span>
//                       </label>
//                     </div>
//                   </fieldset>
//                 </div>
//                 {/* 
//           <!-- Sizes --> */}
//                 <div class="mt-10">
//                   <div class="flex items-center justify-between">
//                     <h3 class="text-sm font-medium text-gray-900">Size</h3>
//                     <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
//                   </div>

//                   <fieldset class="mt-4">
//                     <legend class="sr-only">Choose a size</legend>
//                     <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
//                       {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
//                       <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-not-allowed bg-gray-50 text-gray-200">
//                         <input type="radio" name="size-choice" value="XXS" disabled class="sr-only" aria-labelledby="size-choice-0-label" />
//                         <span id="size-choice-0-label">XXS</span>
//                         <span aria-hidden="true" class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
//                           <svg class="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
//                             <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
//                           </svg>
//                         </span>
//                       </label>
//                       {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
//                       <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
//                         <input type="radio" name="size-choice" value="XS" class="sr-only" aria-labelledby="size-choice-1-label" />
//                         <span id="size-choice-1-label">XS</span>
//                         {/* <!--
//                     Active: "border", Not Active: "border-2"
//                     Checked: "border-indigo-500", Not Checked: "border-transparent"
//                   --> */}
//                         <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                       </label>
//                       {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
//                       <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
//                         <input type="radio" name="size-choice" value="S" class="sr-only" aria-labelledby="size-choice-2-label" />
//                         <span id="size-choice-2-label">S</span>
//                         {/* <!--
//                     Active: "border", Not Active: "border-2"
//                     Checked: "border-indigo-500", Not Checked: "border-transparent"
//                   --> */}
//                         <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                       </label>
//                       {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
//                       <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
//                         <input type="radio" name="size-choice" value="M" class="sr-only" aria-labelledby="size-choice-3-label" />
//                         <span id="size-choice-3-label">M</span>
//                         {/* <!--
//                     Active: "border", Not Active: "border-2"
//                     Checked: "border-indigo-500", Not Checked: "border-transparent"
//                   --> */}
//                         <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                       </label>
//                       {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
//                       <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
//                         <input type="radio" name="size-choice" value="L" class="sr-only" aria-labelledby="size-choice-4-label" />
//                         <span id="size-choice-4-label">L</span>
//                         {/* <!--
//                     Active: "border", Not Active: "border-2"
//                     Checked: "border-indigo-500", Not Checked: "border-transparent"
//                   --> */}
//                         <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                       </label>
//                       {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
//                       <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
//                         <input type="radio" name="size-choice" value="XL" class="sr-only" aria-labelledby="size-choice-5-label" />
//                         <span id="size-choice-5-label">XL</span>
//                         {/* <!--
//                     Active: "border", Not Active: "border-2"
//                     Checked: "border-indigo-500", Not Checked: "border-transparent"
//                   --> */}
//                         <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                       </label>
//                       {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
//                       <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
//                         <input type="radio" name="size-choice" value="2XL" class="sr-only" aria-labelledby="size-choice-6-label" />
//                         <span id="size-choice-6-label">2XL</span>
//                         {/* <!--
//                     Active: "border", Not Active: "border-2"
//                     Checked: "border-indigo-500", Not Checked: "border-transparent"
//                   --> */}
//                         <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                       </label>
//                       {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
//                       <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
//                         <input type="radio" name="size-choice" value="3XL" class="sr-only" aria-labelledby="size-choice-7-label" />
//                         <span id="size-choice-7-label">3XL</span>
//                         {/* <!--
//                     Active: "border", Not Active: "border-2"
//                     Checked: "border-indigo-500", Not Checked: "border-transparent"
//                   --> */}
//                         <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                       </label>
//                     </div>
//                   </fieldset>
//                 </div>

//                 <button type="submit" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to bag</button>
//               </form>
//             </div>

//             <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
//               {/* <!-- Description and details --> */}
//               <div>
//                 <h3 class="sr-only">Description</h3>

//                 <div class="space-y-6">
//                   <p class="text-base text-gray-900">The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: &quot;Black&quot;. Need to add an extra pop of color to your outfit? Our white tee has you covered.</p>
//                 </div>
//               </div>

//               <div class="mt-10">
//                 <h3 class="text-sm font-medium text-gray-900">Highlights</h3>

//                 <div class="mt-4">
//                   <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
//                     <li class="text-gray-400"><span class="text-gray-600">Hand cut and sewn locally</span></li>
//                     <li class="text-gray-400"><span class="text-gray-600">Dyed with our proprietary colors</span></li>
//                     <li class="text-gray-400"><span class="text-gray-600">Pre-washed &amp; pre-shrunk</span></li>
//                     <li class="text-gray-400"><span class="text-gray-600">Ultra-soft 100% cotton</span></li>
//                   </ul>
//                 </div>
//               </div>

//               <div class="mt-10">
//                 <h2 class="text-sm font-medium text-gray-900">Details</h2>

//                 <div class="mt-4 space-y-6">
//                   <p class="text-sm text-gray-600">The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming &quot;Charcoal Gray&quot; limited release.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

//  export default ProductDetails
