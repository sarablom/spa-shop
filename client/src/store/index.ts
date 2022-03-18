import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        cart: cartSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;