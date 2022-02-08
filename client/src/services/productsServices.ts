import { Product } from "../models/Product";
import { User } from "../models/User";

export async function fetchDataByUrl(url: string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getAllProducts() {
  const fetchUrl = "/api/products";
  return fetchDataByUrl(fetchUrl);
}

export async function getSingleProduct(id: string) {
  const fetchUrl = `/api/products/${id}`;
  return fetchDataByUrl(fetchUrl);
}

export async function getSingleCart(id: string) {
  const fetchUrl = `/api/products/cart/${id}`;
  return fetchDataByUrl(fetchUrl);
}

export async function createCart(cartArray: Product[], userObject: User) {
  const cart = await fetch(`/api/products/cart`, {
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
  const cart = await fetch(`/api/products/cart/${cartId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartArray)
  });

  const cartData = await cart.json();
  return cartData;
}
