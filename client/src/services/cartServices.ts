import { User } from "../models/User";
import { Product } from "../models/Product";
//import { CartModel } from "../models/Cart";

export async function fetchDataByUrl(url: string) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }

export async function getAllCarts() {
    const fetchUrl = "/api/carts";
    return fetchDataByUrl(fetchUrl);
  }
  
  export async function getSingleCart(id: string) {
    const fetchUrl = `/api/carts/${id}`;
    return fetchDataByUrl(fetchUrl);
  }
  
  export async function createCart(cartArray: Product[], userObject: User) {
      const cart = await fetch(`/api/carts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ cartArray, userObject }),
    });
    const cartData = await cart.json();
  
    return cartData;
  }
  
  export async function updateCart(cartArray: Product[], cartId: string) {
    const cart = await fetch(`/api/carts/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartArray),
    });
  
    const cartData = await cart.json();
    return cartData;
  }
  