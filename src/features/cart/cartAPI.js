
export function updateCart(updatedItem) {
  const token=localStorage.getItem('token');
  console.log("update in updatecart is in frontend ",updatedItem)
  const id=updatedItem.id;
  console.log("id is ",id);
  delete updatedItem['id']
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/cart/'+id, {
        method: 'PATCH',
        body: JSON.stringify(updatedItem),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      // console.log("data in updateCart",data);
      resolve({ data });
    });
  }
export function deleteItemFromCart(itemId) {
  const token=localStorage.getItem('token');
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/cart/'+itemId, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      console.log("data in deleetItemfromCart after response",data);
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }

export function addToCart(item) {
  const token=localStorage.getItem('token');
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        body: JSON.stringify(item),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }
  
export function fetchItemsByUserId() {
  const token=localStorage.getItem('token');
    return new Promise(async (resolve) =>{
     
      //TODO: we will not hard-code server URL here
      const response = await fetch('http://localhost:3000/cart/userCart/',{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }) 
    
      const data = await response.json()
      console.log("tems in cart is for checking ",data);
      resolve({data})
    })
}

export function resetCart(userId) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve,reject) => {
    try{
      const response = await fetchItemsByUserId(userId);
      const items = response.data.cartItems;
      console.log("items is in reset ",items);
      for (let item of items) {
        await deleteItemFromCart(item.id);
      }
      resolve({data:{status:'success',success:true,message:'reset cart successfully'}})

    }catch(err){
       reject(err)
    }
    
    
  });
}