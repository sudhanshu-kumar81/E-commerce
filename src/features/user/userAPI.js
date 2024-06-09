export function fetchLoggedInUserOrders(userId) {
  const token=localStorage.getItem('token');
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/orders/'+userId,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function fetchLoggedInUser(userId) {
    const token=localStorage.getItem('token');
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/users/'+userId,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      const data = await response.json()
      resolve({data})
    }
    );
  }


  export function updateUser(update) {
    console.log("update in backend",update)
    const token=localStorage.getItem('token');
    console.log("data in update user is ",update)
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/users/'+update.id, {
        method: 'PATCH',
        body: JSON.stringify(update),
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