import { useState, useEffect } from "react";
import { Product } from "../../models/Product";

interface Props {
  cart: Product[] | [];
}

function Cart({ cart }: Props) {
  const [totalPrice, setTotalPrice] = useState<Number>(0);

  useEffect(() => {
    addTotalPrice();
  }, []);

  function addTotalPrice() {
    if (cart) {
      const prices = cart.map((product) => {
        return Number(product.price.split(" ")[0]);
      });
    
      let sum = 0;
      for (let i = 0; i < prices.length; i++) {
        sum += prices[i];
      }

      setTotalPrice(sum);
    }
  }

  return (
    <div>
      <h2>Kundkorg</h2>
      {cart &&
        cart.map((product: Product) => (
          <li key={Math.floor(Math.random() * 100000)}>
            <p>
              {product.title}, {product.price}
            
            <button>Ta bort vara</button>
            </p>
          </li>
        ))}

      <p>Totalt: {totalPrice}</p>
    </div>
  );
}

export default Cart;
