import React from 'react';
import { Product } from "../../models/Product";

interface Props {
    updatedCart: Product[];
  }

function Cart(props: Props) {
   
    
  return <div>
      <h2>Kundkorg</h2>
      {props.updatedCart &&
      props.updatedCart.map((product: Product, index) => (
          <li key={product.id + index}>
              <p>{product.title}, {product.price}</p>
          </li>
      ))}
  </div>;
}

export default Cart;
