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


export function fetchAllProductsByFilter(fil,sort,pagination) {
  console.log("filter is ",fil);
  console.log("sort is ",sort);
    return new Promise(async (resolve) =>{
      let queryString='';
for(let key in fil){
  const categoryValues=fil[key];
  if(categoryValues.length){
    const lastCategoryValue=categoryValues[categoryValues.length-1];
    queryString+=`${key}=${lastCategoryValue}&`
  }
}
for(let key in sort){
  console.log("hi sir",sort[key]);
    queryString+=`${key}=${sort[key]}&`
  }
// for(let key in pagination){
//   queryString+=`${key}=${filter[key]}&`
// }
      //TODO: we will not hard-code server URL here
      console.log("i am to print query string")
     
      console.log("querystring is ",queryString);
      const response = await fetch('http://localhost:3000/products?'+queryString)
      console.log("response after query string is ",response);  
     
    
      const data = await response.json()
      console.log("data in productapi id ",data);
      resolve({data})
    }
    );
  }