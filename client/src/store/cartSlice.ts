import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        totalQuantity: 0,
    },
    reducers: {
        addItemToCart(state) {
            console.log(state); 
            state.totalQuantity = state.totalQuantity + 1;
        },
        removeItemFromCart(state) {
            state.totalQuantity--;
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice;