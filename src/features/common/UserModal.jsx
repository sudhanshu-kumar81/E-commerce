import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const UserModal = ({ order, isOpen, onClose }) => {
  const cancelButtonRef = useRef(null);
  console.log("order is ",order)
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose} initialFocus={cancelButtonRef}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex min-h-screen items-center justify-center fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <Dialog.Panel
              as="div"
              className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all sm:max-w-lg sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      order details 
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500"> orderId : {order.id}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">User : {order.selectedAddress[0].name}</p></div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Email : {order.user.email}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">payment Mode : {order.paymentMethod}</p>
                    </div>
                  
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Amount : {order.totalAmount}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">status : {order.status}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Address : {order.selectedAddress[0].name} {order.selectedAddress[0].city} {order.selectedAddress[0].pincode}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">contactNo : {order.selectedAddress[0].phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
