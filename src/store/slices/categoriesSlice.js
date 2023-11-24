import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        const response = await fetch("http://localhost:3333/categories/all")
        const data = await response.json();
        return data
    }
);
const categoriesSlice = createSlice({

    name: "categories",
    initialState: {
        categories: [],
        status: "idle",
        error: null,
    },
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchCategories.pending, (state) => {
            state.status = "loading";
        } )
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
});

export default categoriesSlice.reducer