export function fetchLoggedInUserOrders(userId) {
  const token=localStorage.getItem('token');
    return new Promise(async (resolve) =>{
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/orders/'+userId,{
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
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/users/fetchUserById/',{
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
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/users/updateUser/'+update.id, {
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
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/users/signup', {
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
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/users/login',{
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

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("arrived in reset password request email is",email);
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/users/reset-password-request', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: { 'content-type': 'application/json' },
      });
      const data=await response.json()
      console.log("data is ",data)
      if(data.success){
        resolve({data})
      }else{
        reject({data})
      }
    } catch (error) {
      reject( error);
    }

  });
}


export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("arrived in reset password API and data is ",data);
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/users/reset-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      });
      const responseData=await response.json()
      console.log("resetData is ",responseData)
      console.log("data in reset password api is ",data);
        resolve({ responseData });
    } catch (error) {
      reject(error);
    }

  });
}