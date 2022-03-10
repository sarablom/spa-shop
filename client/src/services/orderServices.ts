import { CartModel } from "../models/Cart";

export async function placeOrder(cart: CartModel[]) {
    try {
      const response =await fetch(`/api/order`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });
    
      const cartData = await response.json();
    
      return cartData;
    } catch (err) {
      console.log(err);
    }   
}