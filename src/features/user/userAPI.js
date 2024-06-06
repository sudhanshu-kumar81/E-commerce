export function fetchLoggedInUserOrders(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/orders/?user.id='+userId) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function fetchLoggedInUser(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/users/'+userId) 
      const data = await response.json()
      resolve({data})
    }
    );
  }


  export function updateUser(update) {
    console.log("data in update user is ",update)
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/users/'+update.id, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }