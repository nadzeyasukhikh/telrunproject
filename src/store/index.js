import { configureStore } from "@reduxjs/toolkit";
import categoriesReduser from "./slices/categoriesSlice"
import saleSliceReduser from "./slices/saleSlice";
import productSliceReduser from "./slices/productSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesReduser,
        sale: saleSliceReduser,
        products: productSliceReduser
    }
});