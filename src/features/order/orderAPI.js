export function createOrder(order) {
  const token=localStorage.getItem('token');
  console.log("arrived in create order function");  
  return new Promise(async (resolve) => {
    const token=localStorage.getItem('token');
      const response = await fetch('https://e-commerce-backend-alpha-one.vercel.app/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      // console.log("data in create order is ",data);
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }
  export function updateOrder(order) {
    const token=localStorage.getItem('token');
    return new Promise(async (resolve) => {
      const response = await fetch('https://e-commerce-backend-alpha-one.vercel.app/orders/'+order.id, {
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
    console.log("token in fetchAllOrders is ",token);
    console.log("fetchAllOrders sort andpagination ",sort,pagination)
   let queryString = '';
  
   for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
  console.log("query string is ",queryString)
    return new Promise(async (resolve) => {
      //TODO: we will not hard-code server URL here
      const response = await fetch(
        'https://e-commerce-backend-alpha-one.vercel.app/orders?'+queryString,{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      console.log('https://e-commerce-backend-alpha-one.vercel.app/orders?',queryString,)
      const data = await response.json();
      // const totalOrders = await response.headers.get('X-Total-Count');
      resolve({ data });
    });
  }