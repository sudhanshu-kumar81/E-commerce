
export function fetchAllProductsByFilter(fil,sort,pagination) {
  const token=localStorage.getItem('token');
  let queryString='';
  for(let key in fil){
    const categoryValues=fil[key];
    if(categoryValues.length){
      const lastCategoryValue=categoryValues[categoryValues.length-1];
      queryString+=`${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort){
      queryString+=`${key}=${sort[key]}&`
    }
  for(let key in pagination){
    queryString+=`${key}=${pagination[key]}&`
  }
    return new Promise(async (resolve) =>{
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/products?'+queryString,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }) 
      const totalItems=100;
      const data = await response.json()
      resolve({data:{products:data,totalItems:totalItems}})
    }
    );
  }

  export function fetchBrands(){
    return new Promise(async (resolve)=>{
      const response=await fetch('https://e-commerce-backend-3wsm.onrender.com/brands')
      const data=await response.json()
      resolve({data})
    })
  }
  export function fetchCategories(){
    return new Promise(async (resolve)=>{
      const response=await fetch('https://e-commerce-backend-3wsm.onrender.com/categories')
      const data=await response.json()
      resolve({data})
    })
  }
  export function fetchProductById(id){
    const token=localStorage.getItem('token');
    return new Promise(async (resolve)=>{
      const response=await fetch('https://e-commerce-backend-3wsm.onrender.com/products/'+id,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      const data=await response.json()
      resolve({data})
    })
  }

  export function createProduct(product) {
    const token=localStorage.getItem('token');
    return new Promise(async (resolve) => {
      const response = await fetch('https://e-commerce-backend-3wsm.onrender.com/products/', {
        method: 'POST',
        body: JSON.stringify(product),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      
      resolve({ data });
    });
  }
  
  export function updateProduct(update) {
    const token=localStorage.getItem('token');
    return new Promise(async (resolve) => {
      const response = await fetch(
        'https://e-commerce-backend-3wsm.onrender.com/products/' + update.id,
        {
          method: 'PATCH',
          body: JSON.stringify(update),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }
  