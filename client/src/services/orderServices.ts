import { CartModel } from "../models/Cart";

export async function placeOrder(cart: CartModel[]) {
    console.log(cart);
    
    const response =await fetch(`/api/order`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
  
    const cartData = await response.json();
  
    return cartData;
  }