export function createUser(userData) {
    // console.log("arrived in create user",userData)
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // console.log("data in CreateUserfunction is ",data);
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }
  export function checkUser(loginInfo) {
    // console.log("arrived in checkuser")
    return new Promise(async (resolve, reject) => {
      const email = loginInfo.email;
      const password = loginInfo.password;
      const response = await fetch('http://localhost:3000/users?email=' + email);
      const data = await response.json();
      // console.log({data})
      // console.log("data  in checkuser",data)
      if (data.length) {
        if (password === data[0].password) {
          resolve({ data: data[0] });
        } else {
          reject({ message: 'wrong credentials' });
        }
      } else {
        reject({ message: 'user not found' });
      }
      // TODO: on server it will only return some info of user (not password)
    });
}
export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}
