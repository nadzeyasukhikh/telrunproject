import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice"
import saleSlice from "./slices/saleSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        sale: saleSlice,

    }
});