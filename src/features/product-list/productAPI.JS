export function fetchAllProducts() {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('http://localhost:3000/products') 
    
      const data = await response.json()
      console.log("data in productapi id ",data);
      resolve({data})
    }
    );
  }
  export function fetchAllProductsByFilter(filter) {
    return new Promise(async (resolve) =>{
      let queryString='';
for(let key in filter){
  queryString+=`${key}=${filter[key]}&`
}
      //TODO: we will not hard-code server URL here
      const response = await fetch('http://localhost:3000/products?'+queryString) 
    
      const data = await response.json()
      console.log("data in productapi id ",data);
      resolve({data})
    }
    );
  }