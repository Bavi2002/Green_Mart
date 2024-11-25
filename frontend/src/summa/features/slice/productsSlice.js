// src/features/slice/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    productDetail: {},
    loading: false,
};

// Fetch products (simulating an API call with dummy data)
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
});

// Fetch product detail
export const fetchProductDetail = createAsyncThunk("products/fetchProductDetail", async (id) => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
});

const productsSlice = createSlice({
    name: "products",
    initialState,  // <-- Now this will reference the defined initialState
    reducers: {
        removeProductDetail: (state) => {
            state.productDetail = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchProductDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetail = action.payload;
            })
            .addCase(fetchProductDetail.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default productsSlice.reducer;
export const getAllProducts = (state) => state.products.items;
export const getProductDetail = (state) => state.products.productDetail;
export const getLoading = (state) => state.products.loading;
export const { removeProductDetail } = productsSlice.actions;
