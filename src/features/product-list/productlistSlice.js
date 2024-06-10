import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {  fetchAllProductsByFilter,fetchBrands,fetchCategories, fetchProductById, createProduct,
  updateProduct,} from './productAPI.JS'
// First, create the thunk
// export const fetchAllProductsAsync = createAsyncThunk(
//   'product/fetchAllProducts',
//   async () => {
//     const response = await fetchAllProducts();
//     // console.log("response from fetchAllProductsAsync is ", response);
//     return response.data
//   },
// )
export const  fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchAllProductsByFilter',
  async ({ fil, sort, pagination }) => {
    // console.log("fil ans sort and pageination are are", fil, sort, pagination);
    const response = await fetchAllProductsByFilter(fil, sort, pagination);
    // console.log("response from fetchAllProductsAsync is ", response);
    return response.data
  },
)
export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    // console.log("response from fetchBrandAsync is ", response);
    return response.data;
  }
)
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // console.log("response from fetchBrandAsync is ", response);
    return response.data;
  }
)
export const createProductAsync = createAsyncThunk(
  'product/create',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);
export const fetchProductByIdAsync  = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const initialState = {
  products: [],
  brands: [],
  categories: [],
  totalItems: 0,
  status: 'idle',
  selectedProduct:null,
}

// Then, handle actions in your reducers:
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProduct = null
    }
  },
  extraReducers: (builder) => {

    builder
      .addCase( fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase( fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products = action.payload.products.product
        state.totalItems = action.payload.products.totalDocs
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBrandsAsync.fulfilled, (state,action) => {
        state.status = 'idle'
        state.brands = action.payload.brands
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state,action) => {
        state.status = 'idle'
        state.categories = action.payload.category
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload.product;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload.doc);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.product.id
        );
        state.products[index] = action.payload.product;
        state.selectedProduct=action.payload.product
      });

  },
})
export const selectAllProducts = (state) => state.product.products
export const selectBrands = (state) => state.product.brands
export const selectProductById = (state) => state.product.selectedProduct;
export const selectCategories = (state) => state.product.categories
export const selectTotalItems = (state) => state.product.totalItems
export const selectProductListStatus= (state) => state.product.status
export default productSlice.reducer
export const {clearSelectedProduct}=productSlice.actions