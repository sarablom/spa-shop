import {useState} from "react";
import { Product } from "../../models/Product"

interface Props {
    cart: Product[] | [];
  }

function Cart({cart}: Props) {
  const [totalPrice, setTotalPrice] = useState<Number>(0);

  addTotalPrice()

  function addTotalPrice () {
    if (cart.length > 0) {
      cart.map((product) => {
        return console.log(Number(product.price));
        
      })
      //setTotalPrice(count)
    }
  }
  

  return <div>
      <h2>Kundkorg</h2>
      {cart &&
      cart.map((product: Product) => (
          <li key={Math.floor(Math.random() * 100000)}>
              <p>{product.title}, {product.price}</p>
          </li>
      ))}

      <p>Totalt: {totalPrice}</p>
  </div>;
}

export default Cart;
