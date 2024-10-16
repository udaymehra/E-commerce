import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "adminProducts/addNewProduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/products/get"
    );
    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "adminProducts/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`
    );
    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
       state.isLoading=true
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;  // Set loading state to false
        state.productList = action.payload.data;  // Update product list
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;  // Set loading state to false
        state.productList = [];    // Clear product list on error
        // console.error("Failed to fetch products:", action.error.message); // Log the error
      });
  },
});

export default AdminProductsSlice.reducer;
