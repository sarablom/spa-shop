import { useState, useEffect } from "react";
import { Product } from "../../models/Product";
import styled from "styled-components";
import { saveCartToLocalStorage } from "../../services/localStorageServices";
import { COLORS } from "../../styles/constants";

interface Props {
  updatedCart: Product[] | [] | null;
  setUpdatedCart: Function;
  setAddClassCartElem: Function;
  addClassCartElem: string;
}

function Cart({
  updatedCart,
  setUpdatedCart,
  setAddClassCartElem,
  addClassCartElem,
}: Props) {
  const [totalPrice, setTotalPrice] = useState<Number | null>(null);

  useEffect(() => {
    addTotalPrice();
  }, []);

  function addTotalPrice() {
    if (!updatedCart) {
    } else if (updatedCart?.length > 0) {
      const prices = updatedCart.map((product) => {
        return Number(product.price.split(" ")[0]);
      });

      let sum = 0;
      for (let i = 0; i < prices.length; i++) {
        sum += prices[i];
      }

      setTotalPrice(sum);
    } else if (updatedCart.length === 0) {
      setTotalPrice(0);
    }
  }

  function deleteHandler(index: number) {
    if (updatedCart) {
      const newCart = [...updatedCart];
      newCart.splice(index, 1);
      setUpdatedCart(newCart);
      saveCartToLocalStorage(newCart);
    }
  }

  function closeNavHandler() {
    setAddClassCartElem("hide");
  }

  return (
    <ListWrapper>
      <ul className={addClassCartElem}>
        <h2>Kundkorg</h2>
        <button className="close" onClick={() => closeNavHandler()}>
          {/* &times; */} Stäng
        </button>
        {updatedCart &&
          updatedCart.map((product: Product, index) => (
            <ListItem
              data-key={product.title}
              key={Math.floor(Math.random() * 100000)}
            >
              <p>
                <span>
                  {product.title}, {product.price}
                </span>
                <button
                  onClick={() => {
                    deleteHandler(index);
                  }}
                >
                  X
                </button>
              </p>
            </ListItem>
          ))}
        {updatedCart && updatedCart.length > 0 && <p>Totalt: {totalPrice && totalPrice} SEK</p>}
        {(!updatedCart || updatedCart.length === 0) && <p>Kundkorgen är tom! Varför inte shoppa lite?</p>}
      </ul>
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  ul {
    list-style-type: none;
    height: 100vh;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: ${COLORS.lightGreen};
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }

  .show {
    width: 500px;
  }

  .hide {
    width: 0;
    display: none;
  }

  button.close {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 18px;
    margin-left: 50px;
  }
`;

const ListItem = styled.li`
  padding: 0.5rem 1rem;

  p {
    display grid;
    grid-template-columns: 80% 20%;
    width: 80%;
    align-items: space between;
  }

  button {
    /* margin-left: 1rem; */
    padding: 0.2rem 0.5rem;
    cursor: pointer;
  }
`;

export default Cart;
