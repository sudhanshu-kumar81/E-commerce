export function createOrder(order) {
  const token=localStorage.getItem('token');
  return new Promise(async (resolve) => {
    const token=localStorage.getItem('token');
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  export function updateOrder(order) {
    const token=localStorage.getItem('token');
    return new Promise(async (resolve) => {
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/orders/'+order.id, {
        method: 'PATCH',
        body: JSON.stringify(order),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export function fetchAllOrders(sort, pagination) {
    const token=localStorage.getItem('token');
   let queryString = '';
  
   for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
    return new Promise(async (resolve) => {
      //TODO: we will not hard-code server URL here
      const response = await fetch(
        'https://e-commerce-backend-3wsm.onrender.com/orders?'+queryString,{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      const data = await response.json();
      // const totalOrders = await response.headers.get('X-Total-Count');
      resolve({ data });
    });
  }