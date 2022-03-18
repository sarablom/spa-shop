import { createSlice } from "@reduxjs/toolkit";
import { CartModel } from "../models/Cart";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [] as CartModel[],
        totalQuantity: 0,
        totalAmount: 0,
    },
    reducers: {
        addItemToCart(state) {
            state.totalQuantity++;
            // const cartItem: CartModel = action.payload;
            // const existingCartItems = state.cartItems.find(item => item._id === cartItem._id);
            // if (!existingCartItems) {
            //     state.cartItems.push(cartItem);
            // } else {
            //     existingCartItems.quantity ++;
            // }
        },
        removeItemFromCart(state) {
            state.totalQuantity--;
            // const id = action.payload;
            // const existingCartItem = state.cartItems.find(item => item._id === id);
            // if (existingCartItem !== undefined) {
            //     if (existingCartItem.quantity === 1) {
            //     state.cartItems.filter(item => item._id !== id);
            // } else {
            //     existingCartItem.quantity--;
            // }}
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice;