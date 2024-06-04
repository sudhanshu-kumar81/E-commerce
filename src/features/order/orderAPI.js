export function createOrder(order) {
  console.log("arrived in create order function");  
  return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // console.log("data in create order is ",data);
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }
  export function updateOrder(order) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/orders/'+order.id, {
        method: 'PATCH',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export function fetchAllOrders(sort, pagination) {
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
        'http://localhost:3000/orders?'+queryString
      );
      console.log('http://localhost:3000/orders?'+queryString)
      const data = await response.json();
      // const totalOrders = await response.headers.get('X-Total-Count');
      resolve({ data: { orders: data } });
    });
  }