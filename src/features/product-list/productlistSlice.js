import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {  fetchAllProductsByFilter,fetchBrands,fetchCategories, fetchProductById, createProduct,
  updateProduct,} from './productAPI.JS'

export const  fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchAllProductsByFilter',
  async ({ fil, sort, pagination }) => {


  

    const response = await fetchAllProductsByFilter(fil, sort, pagination);
    return response.data
  },
)
export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async (_,{ rejectWithValue }) => {
    try {
      const response = await fetchBrands();
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    }catch (error) {
      return rejectWithValue(error.data.message || { message: error.message });
    }
  
})
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async (_,{ rejectWithValue }) => {
    try {
      const response = await fetchCategories();
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    }catch (error) {
      return rejectWithValue(error.data.message || { message: error.message });
    }
  
})
export const createProductAsync = createAsyncThunk(
  'product/create',
    async (product,{ rejectWithValue }) => {
    try {
      const response = await createProduct(product);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    }catch (error) {
      return rejectWithValue(error.data.message || { message: error.message });
    }
  
}
);

export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (update,{ rejectWithValue }) => {
    try {
      const response = await updateProduct(update);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    }catch (error) {
      return rejectWithValue(error.data.message || { message: error.message });
    }
  }
);
export const fetchProductByIdAsync  = createAsyncThunk(
  'product/fetchProductById',
  async (id,{ rejectWithValue }) => {
    try {
      const response = await fetchProductById(id);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    }catch (error) {
      return rejectWithValue(error.data.message || { message: error.message });
    }
  }
);

const initialState = {
  products: [],
  brands: [],
  categories: [],
  fetchProductStatus:'',
  totalItems: 0,
  status: '',
  message:null,
  selectedProduct:null,
}

// Then, handle actions in your reducers:
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProduct = null
    },
    clearStatusAndMessage:(state)=>{
      state.status = '';
      state.message=null;
    },
    clearAdminStatusAndMessage:(state)=>{
      state.Adminstatus = '';
      state.Adminmessage=null;
    }
    
  },
  extraReducers: (builder) => {

    builder
      .addCase( fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'pending'
      })
      .addCase( fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.products = action.payload.products.product
        state.totalItems = action.payload.products.totalDocs
      })
      .addCase( fetchProductsByFiltersAsync.rejected, (state,action) => {
        state.status = 'rejected'
        state.message=action?.payload||"failed to fetch product"
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchBrandsAsync.fulfilled, (state,action) => {
        state.status = 'fulfilled'
        state.brands = action.payload.brands
      })
      .addCase(fetchBrandsAsync.rejected, (state,action) => {
        state.status = 'rejected'
          state.message=action?.payload||"failed to fetch Brand"
      })

      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state,action) => {
        state.status = 'fulfilled'
        state.categories = action.payload.category
      })
      .addCase(fetchCategoriesAsync.rejected, (state,action) => {
        state.status = 'rejected';
        state.message=action?.payload||"failed to fetch category"
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.fetchProductStatus = 'pending';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.fetchProductStatus = 'fulfilled';
        state.selectedProduct = action.payload.product;
      })
      .addCase(fetchProductByIdAsync.rejected, (state,action) => {
        state.fetchProductStatus = 'rejected';
        state.selectedProduct = null;
        state.message=action?.payload||"failed to fetch product By Id"
      })
      .addCase(createProductAsync.pending, (state) => {
        state.Adminstatus = 'pending';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.Adminstatus = 'fulfilled';
        state.Adminmessage =action.payload.message 
        state.products.push(action.payload.doc);
      })
      .addCase(createProductAsync.rejected, (state,action) => {
        state.Adminstatus = 'rejected';
        state.Adminmessage=action?.payload||"failed to create product"
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.Adminstatus = 'pending';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.Adminstatus = 'fulfilled';
        state.Adminmessage=action.payload.message
        const index = state.products.findIndex(
          (product) => product.id === action.payload.product.id
        );
        state.products[index] = action.payload.product;
        state.selectedProduct=action.payload.product
      })
      .addCase(updateProductAsync.rejected, (state,action) => {
        state.Adminstatus = 'rejected';
         state.Adminmessage=action?.payload||"failed to update product"
      });

  },
})
export const selectAllProducts = (state) => state.product.products
export const selectBrands = (state) => state.product.brands
export const selectProductById = (state) => state.product.selectedProduct;
export const selectCategories = (state) => state.product.categories
export const selectTotalItems = (state) => state.product.totalItems
export const selectProductListStatus= (state) => state.product.status
export const selectProductListAdminStatus= (state) => state.product.Adminstatus
export const selectProductListfetchProductStatus= (state) => state.product.fetchProductStatus
export const selectProductListAdminmessage= (state) => state.product.Adminmessage
export const selectProductListMessage= (state) => state.product.message//fetchProductStatus
export default productSlice.reducer
export const {clearSelectedProduct,clearStatusAndMessage,clearAdminStatusAndMessage}=productSlice.actions