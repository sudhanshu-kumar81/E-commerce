
export function updateCart(updatedItem) {
  console.log("update in updatecart is in frontend ",updatedItem)
  const id=updatedItem.id;
  console.log("id is ",id);
  delete updatedItem['id']
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/cart/'+id, {
        method: 'PATCH',
        body: JSON.stringify(updatedItem),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      // console.log("data in updateCart",data);
      resolve({ data });
    });
  }
  export function deleteItemFromCart(itemId) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/cart/'+itemId, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      console.log("data in deleetItemfromCart after response",data);
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }

export function addToCart(item) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }
  
export function fetchItemsByUserId(userId) {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('http://localhost:3000/cart?user='+userId) 
      console.log("http://localhost:3000/cart?user='+userId",+userId);
      const data = await response.json()
      resolve({data})
    })
}

export function resetCart(userId) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data.cartItems;
    console.log("items is in reset ",items);
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({status:'success'})
  });
}