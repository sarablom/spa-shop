import { useState, useEffect } from "react";
import { Product } from "../../models/Product";
import styled from "styled-components";
import { COLORS } from "../../styles/constants";

interface Props {
  cart: Product[] | [];
}

function Cart({ cart }: Props) {
  const [totalPrice, setTotalPrice] = useState<Number>(0);
  
  useEffect(() => {
    addTotalPrice();
  }, []);

  function addTotalPrice() {
    if (cart.length > 0) {
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

  function deleteHandler (e: any) {
    console.log(e.target.parentElement.parentElement.getAttribute("data-key"));
    
  }

  return (
    <List>
      <h2>Kundkorg</h2>
      {cart &&
        cart.map((product: Product) => (
          <ListItem data-key={product.title} key={Math.floor(Math.random() * 100000)}>
            <p>
              {product.title}, {product.price}
            
            <button onClick={(e) => {deleteHandler(e)}}>Ta bort vara</button>
            </p>
          </ListItem>
        ))}

      <p>Totalt: {totalPrice}</p>
    </List>
  );
}

const List = styled.ul `
  list-style-type: none;  
`

const ListItem = styled.li `
  padding: .5rem 1rem;

  button {
    margin-left: 1rem;
    padding: .5rem 1rem;
    cursor: pointer;
  }
`

export default Cart;
