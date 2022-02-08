import React from 'react';
import { Product } from "../../models/Product";
import { getCartFromLocalStorage } from "../../services/localStorageServices";

interface Props {
    cart: Product[] | [];
  }

function Cart(props: Props) {
  return <div>
      <h2>Kundkorg</h2>
      {props.cart &&
      props.cart.map((product: Product) => (
          <li key={Math.floor(Math.random() * 100)}>
              <p>{product.title}, {product.price}</p>
          </li>
      ))}
  </div>;
}

export default Cart;
