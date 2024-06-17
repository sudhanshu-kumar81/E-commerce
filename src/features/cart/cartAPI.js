
export function updateCart(updatedItem) {
  const token=localStorage.getItem('token');
  const id=updatedItem.id;
  delete updatedItem['id']
    return new Promise(async (resolve) => {
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/cart/'+id, {
        method: 'PATCH',
        body: JSON.stringify(updatedItem),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      resolve({ data });
    });
  }
export function deleteItemFromCart(itemId) {
  const token=localStorage.getItem('token');
    return new Promise(async (resolve) => {
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/cart/'+itemId, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      resolve({ data });
    });
  }

export function addToCart(item) {
  const token=localStorage.getItem('token');
    return new Promise(async (resolve) => {
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/cart', {
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
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/cart/userCart/',{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }) 
    
      const data = await response.json()
      resolve({data})
    })
}

export function resetCart(userId) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve,reject) => {
    try{
      const response = await fetchItemsByUserId(userId);
      const items = response.data.cartItems;
      for (let item of items) {
        await deleteItemFromCart(item.id);
      }
      resolve({data:{status:'success',success:true,message:'reset cart successfully'}})

    }catch(err){
       reject(err)
    }
    
    
  });
}