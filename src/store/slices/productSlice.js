import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, {rejectWithValue}) => {
        try{
         const response = await fetch("http://localhost:3333/products/all")
         const data = await response.json();
         return data
        }catch (error){
         return rejectWithValue(error)
        }
     }
)

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        status: "idle",
        error: null,
    },
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = "loading";
        } )
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },

    
})

export default productSlice.reducer