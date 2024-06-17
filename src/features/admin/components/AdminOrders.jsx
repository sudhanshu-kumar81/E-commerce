import { useEffect, useState } from 'react';
import {Grid} from 'react-loader-spinner'
import {discountedPrice } from '../../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatusForOrder } from '../../order/orderSlice';
import {UserModal} from '../../common/UserModal.jsx';
import { ITEM_PER_PAGE } from '../../../app/constants';
import {
  fetchAllOrdersAsync,
  selectAllOrdersForAdmin,
  selectTotalOrders,
  updateOrderAsync,
} from '../../order/orderSlice';
import { Circles } from 'react-loader-spinner'

import { resetOrderStatusAndMessage } from '../../order/orderSlice';
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import Pagination from '../../common/Pagination';
import { useAlert } from 'react-alert';
import { selectFetchOrderStatus } from '../../order/orderSlice';
function AdminOrders() {
  const status=useSelector(selectStatusForOrder)
  const fetchStatus=useSelector(selectFetchOrderStatus)
  const alert=useAlert()
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrdersForAdmin);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState(null); 
  
  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };
  const handleShow = (order) => {
    setModalContent(order);
    setIsModalOpen(true); // Open modal
  };


  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value,user:order.user.id};
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const HandlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-purple-200 text-purple-600';
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'delivered':
        return 'bg-green-200 text-green-600';
      case 'cancelled':
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  };

  useEffect(() => {
    const pagination = { _page: page,_per_page: ITEM_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);
  useEffect(()=>{
   if(status==='fulfilled'){
     alert.success("status updated");
     dispatch(resetOrderStatusAndMessage())
   }
   if(status==='rejected'){
    alert.error("failed updation")
    dispatch(resetOrderStatusAndMessage())
   }
  },[status,dispatch])
 

  return (
  
    <>
    {
      fetchStatus==='rejected'&&(<div className='text-red-600'>
      Failed to load Orders...
      </div>)
    }
     {
  fetchStatus === 'pending' && (
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
    
    <div className="overflow-x-auto">
    
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
      
        <div className="w-full">
        {
      status==='loading'?(<Grid
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
        />):null
    }
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: 'id',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    Order# {' '}
                    {sort._sort === 'id' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: 'totalAmount',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    Total Amount {' '}
                    {sort._sort === 'totalAmount' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-6 text-center">Shipping Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {(orders&&totalOrders)&&orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items.map((item,index) => (
                        <div key={index} className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                            />
                          </div>
                          <span>
                            {item.product.title} - #{item.quantity} - $
                            {discountedPrice(item.product)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div >
                        <div>
                          <strong>{order.selectedAddress[0].name}</strong>,
                        </div>
                        <div>{order.selectedAddress[0].street},</div>
                        <div>{order.selectedAddress[0].city}, </div>
                        <div>{order.selectedAddress[0].state}, </div>
                        <div>{order.selectedAddress[0].pinCode}, </div>
                        <div>{order.selectedAddress[0].phone}, </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <EyeIcon
                            className="w-8 h-8"
                            onClick={(e) => handleShow(order)}
                          ></EyeIcon>
                        </div>
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-8 h-8"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        HandlePage={HandlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
   {
    orders&&modalContent&& <UserModal 
    order={modalContent} 
    isOpen={isModalOpen} 
    onClose={closeModal} 
  /> 
   }
    </>
  );
}

export default AdminOrders;