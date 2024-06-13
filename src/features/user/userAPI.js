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

  export function fetchLoggedInUser() {
    const token=localStorage.getItem('token');
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/users/fetchUserById/',{
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
    try{
      const response = await fetch('http://localhost:3000/users/updateUser/'+update.id, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      resolve({ data });
    }catch(error){
      reject({error:error.message})
    }
      
    });
  }


  export function createUser(userData) {
    // console.log("arrived in create user",userData)
    return new Promise(async (resolve) => {
      console.log("userdata in create User",userData);
      const response = await fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      console.log("data in CreateUserfunction is ",data);
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }
  export function checkUser(loginInfo) {
    console.log("arrived in checkuser loginInfo is ",loginInfo)
    return new Promise(async (resolve, reject) => {
      const email = loginInfo.email;
      const password = loginInfo.password;
      const response = await fetch('http://localhost:3000/users/login',{
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      console.log("data in check user is ",data);
      if(data.success){
        localStorage.setItem('token', data.token);
        localStorage.setItem('id',data.user.id);
        resolve({ data });
      }else{
        reject({data})
      }
     
    });



}
export function signOut(userId) {
  return new Promise(async (resolve) => {

    resolve({ data: 'success' });
  });
}