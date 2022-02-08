import React from 'react';
import { Product } from "../../models/Product";
import { getCartFromLocalStorage } from "../../services/localStorageServices";

function Cart() {
   const cart = getCartFromLocalStorage();
    
  return <div>
      <h2>Kundkorg</h2>
      {cart &&
      cart.map((product: Product) => (
          <li key={product.id}>
              <p>{product.title}, {product.price}</p>
          </li>
      ))}
  </div>;
}

export default Cart;
