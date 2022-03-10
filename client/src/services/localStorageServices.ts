import { CartModel } from "../models/Cart";

export function saveTokenToLocalStorage (token: string) {
    localStorage.setItem('spaShopToken', token);
}

export function getTokenFromLocalStorage (): string | null {
    const token = localStorage.getItem("spaShopToken");
    return token ? token : null;
}

export function getCartFromLocalStorage () {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : null;
}

export function saveCartToLocalStorage (products: CartModel[]) {
    localStorage.setItem('cart', JSON.stringify(products));
}