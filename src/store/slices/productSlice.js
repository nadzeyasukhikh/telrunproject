import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3333/products/all");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    cartItemCount: JSON.parse(localStorage.getItem('cartItems'))?.length || 0,
  },
  reducers: {
    addToCart: (state, action) => {
        const existingIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (existingIndex >= 0) {
          state.cartItems[existingIndex].quantity += 1;
        } else {
          state.cartItems.push({ ...action.payload, quantity: 1 });
        }
        state.cartItemCount += 1;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      state.cartItemCount = state.cartItems.length;
  },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;
