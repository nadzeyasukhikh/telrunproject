import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchProductsByCategory = createAsyncThunk(
    "categoryProducts/fetchByCategory",
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3333/categories/${categoryId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const products = await response.json();
            return products;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const productsSlice = createSlice({
    name: "categoryProducts",
    initialState: {
        productsByCategory: {},
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                
                state.productsByCategory[action.meta.arg] = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
