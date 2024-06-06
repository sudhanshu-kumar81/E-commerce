export function createUser(userData) {
    // console.log("arrived in create user",userData)
    return new Promise(async (resolve) => {
      console.log("userdata in create User",userData);
      const response = await fetch('http://localhost:3000/auth/signup', {
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
      const response = await fetch('http://localhost:3000/auth/login',{
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      console.log("data in check user is ",data);
      if(data.success){
        resolve({ data });
      }else{
        reject({data})
      }
     
    });



}
export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}
