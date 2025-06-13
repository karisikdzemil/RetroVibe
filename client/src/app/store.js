import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/user-slice";
import categoryReducer from "../features/category/category-slice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer,
    }
})