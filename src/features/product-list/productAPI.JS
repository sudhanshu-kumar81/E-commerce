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
  console.log("pagination  is ",pagination);
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
  for(let key in pagination){
    queryString+=`${key}=${pagination[key]}&`
  }
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/products?'+queryString)
      console.log("response after query string is ",response);  
      const totalItems=100;
      const data = await response.json()
      console.log("data in productapi id ",data);
      resolve({data:{products:data,totalItems:totalItems}})
    }
    );
  }

  export function fetchBrands(){
    return new Promise(async (resolve)=>{
      console.log("before requets");
      const response=await fetch('http://localhost:3000/brands')
      console.log("after requets");
      const data=await response.json()
      console.log("brand in productApi",data)
      resolve({data})
    })
  }
  export function fetchCategories(){
    return new Promise(async (resolve)=>{
      const response=await fetch('http://localhost:3000/categories')
      const data=await response.json()
      console.log("category in productApi",data)
      resolve({data})
    })
  }
  export function fetchProductById(id){
    return new Promise(async (resolve)=>{
      const response=await fetch('http://localhost:3000/products/'+id)
      const data=await response.json()
      console.log("category in productApi fetcchProductApi",data)
      resolve({data})
    })
  }