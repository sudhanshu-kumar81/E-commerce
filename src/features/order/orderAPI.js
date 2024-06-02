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