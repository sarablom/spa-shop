import { CartModel } from "../models/Cart";

export function addTotalPrice(cart: CartModel[]) {
  if (!cart) {
    return;
  } else if (cart?.length > 0) {
    const prices = cart.map((product) => {
      return product.price * product.quantity;
    });

    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
      sum += prices[i];
    }
    return sum;
  } else if (cart.length === 0) {
    let sum = 0;
    return sum;
  }
}

export function addTotalQuantity(cart: CartModel[]) {
  if (!cart) {
    return 0;
  } else if (cart?.length > 0) {
    const quantity = cart.map((product) => {
      return product.quantity;
    });

    let sum = 0;
    for (let i = 0; i < quantity.length; i++) {
      sum += quantity[i];
    }
    return sum;
  } else if (cart.length === 0) {
    let sum = 0;
    return sum;
  }
}
