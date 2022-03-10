// import { User } from "../models/User";
import { CartModel } from "../models/Cart";

// export function saveUserToLocalStorage (user: User) {
//     localStorage.setItem('spaShopUser', JSON.stringify(user));
// }

export function saveTokenToLocalStorage (token: string) {
    localStorage.setItem('spaShopToken', token);
}

// export function getUserFromLocalStorage () {
//     const user = localStorage.getItem("spaShopUser");
//     return user ? JSON.parse(user) : null;
// }

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