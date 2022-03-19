import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        totalQuantity: 0,
    },
    reducers: {
        sumTotalQuantity(state, action) {
            state.totalQuantity = action.payload;
        },
        removeItemFromCart(state) {
            state.totalQuantity--;
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice;