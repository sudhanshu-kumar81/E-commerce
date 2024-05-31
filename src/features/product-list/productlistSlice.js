import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAllProducts, fetchAllProductsByFilter,fetchBrands,fetchCategories, fetchProductById} from './productAPI.JS'
// First, create the thunk
export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    console.log("response from fetchAllProductsAsync is ", response);
    return response.data
  },
)
export const fetchAllProductsByFilterAsync = createAsyncThunk(
  'product/fetchAllProductsByFilter',
  async ({ fil, sort, pagination }) => {
    console.log("fil ans sort and pageination are are", fil, sort, pagination);
    const response = await fetchAllProductsByFilter(fil, sort, pagination);
    console.log("response from fetchAllProductsAsync is ", response);
    return response.data
  },
)
export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    console.log("response from fetchBrandAsync is ", response);
    return response.data;
  }
)
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    console.log("response from fetchBrandAsync is ", response);
    return response.data;
  }
)
export const fetchAllProductByIdAsync = createAsyncThunk(
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
    increment: (state) => {
      state.value += 1;
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {

    builder.addCase(fetchAllProductsAsync.pending, (state) => {
      state.status = 'loading'
    })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products = action.payload
      })
      .addCase(fetchAllProductsByFilterAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products = action.payload.products
        state.totalItems = action.payload.products.items
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBrandsAsync.fulfilled, (state,action) => {
        state.status = 'idle'
        state.brands = action.payload
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state,action) => {
        state.status = 'idle'
        state.categories = action.payload
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })

  },
})
export const { increment } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products.data
export const selectBrands = (state) => state.product.brands
export const selectProductById = (state) => state.product.selectedProduct;
export const selectCategories = (state) => state.product.categories
export const selectTotalItems = (state) => state.product.totalItems
export default productSlice.reducer