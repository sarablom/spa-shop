import { User } from "../models/User";

export function saveUserToLocalStorage (user: User) {
    localStorage.setItem('spaShopUser', JSON.stringify(user));
}

export function saveTokenToLocalStorage (token: string) {
    localStorage.setItem('spaShopToken', token);
}

export function getUserFromLocalStorage () {
    const user = localStorage.getItem("spaShopUser");
    return user ? JSON.parse(user) : null;
}

export function getTokenFromLocalStorage (): string | null {
    const token = localStorage.getItem("spaShopToken");
    return token ? token : null;
}