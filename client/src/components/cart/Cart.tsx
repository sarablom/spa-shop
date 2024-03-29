import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CartModel } from "../../models/Cart";
import styled from "styled-components";
import {
  saveCartToLocalStorage,
  getTokenFromLocalStorage,
} from "../../services/localStorageServices";
import { getUser } from "../../services/userServices";
import { addTotalPrice } from "../../utils/helperFunctions";
import { getSingleProduct } from "../../services/productsServices";
import { placeOrder } from "../../services/orderServices";
import { COLORS } from "../../styles/constants";
import { Trash2, XCircle } from "react-feather";
import { User } from "../../models/User";

interface Props {
  updatedCart: CartModel[] | [] | null;
  setUpdatedCart: Function;
  setAddClassCartElem: Function;
  addClassCartElem: string;
  setTotalPrice: Function;
  totalPrice: Number | null;
}

function Cart({
  updatedCart,
  setUpdatedCart,
  setAddClassCartElem,
  addClassCartElem,
  setTotalPrice,
  totalPrice,
}: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [buyMessage, setBuyMessage] = useState("");
  const token = getTokenFromLocalStorage();
  const navigate = useNavigate();

  const getUserName = useCallback(async () => {
    if (token) {
      const fetchedUser = await getUser(token as string);
      if (fetchedUser?.success) {
        setUser(fetchedUser.user);
      }
    }
  }, [token]);

  useEffect(() => {
    getUserName();
  }, [getUserName]);

  useEffect(() => {
    const sum = addTotalPrice(updatedCart as CartModel[]);
    setTotalPrice(sum as number);
  }, [updatedCart]);

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

  function decrementValue(product: CartModel, index: number) {
    const productMatch = updatedCart?.find(
      (item: CartModel) => item._id === product._id
    );

    const newCart = updatedCart?.map((item: CartModel) => {
      const spreadItem = { ...item };

      if (item._id === productMatch?._id && product.quantity > 0) {
        spreadItem.quantity--;
      } else if (product.quantity === 0) {
        deleteHandler(index);
      }
      return spreadItem;
    });
    setUpdatedCart(newCart as CartModel[]);
    saveCartToLocalStorage(newCart as CartModel[]);
  }

  function incrementValue(product: CartModel) {
    const productMatch = updatedCart?.find(
      (item: CartModel) => item._id === product._id
    );

    const newCart = updatedCart?.map((item: CartModel) => {
      const spreadItem = { ...item };

      if (item._id === productMatch?._id) {
        spreadItem.quantity++;
      }
      return spreadItem;
    });
    setUpdatedCart(newCart as CartModel[]);
    saveCartToLocalStorage(newCart as CartModel[]);
  }

  async function onBuyHandler() {
    updatedCart?.forEach(async (item) => {
      let productInBasket = await getSingleProduct(item._id);
      let updateValue = Number(item.inStock) - item.quantity;
      productInBasket.product.inStock = updateValue;

      await placeOrder(updatedCart as CartModel[]);
      setUpdatedCart([]);
      saveCartToLocalStorage([]);
      const message = `Tack för ditt köp ${user?.firstName} ${user?.lastName} 🎉! 
      Din beställning kommer att skickas till ${user?.address}, ${user?.zipCode}.
      Du dirigeras snart till startsidan.`
      setBuyMessage(message);
      setTimeout(() => {
        navigate("/");
      }, 10000);
    });
  }

  function navigateHandler() {
    navigate("/login");
  }

  return (
    <Overlay className={addClassCartElem} onClick={() => closeNavHandler()}>
      <ListWrapper onClick={(e) => e.stopPropagation()}>
        <ul className={addClassCartElem}>
          <h2>Kundkorg</h2>
          <hr />
          {user && <h3>Hej {user.firstName}, välkommen till din kundkorg!</h3>}
          <button
            data-testid="close"
            className="close"
            onClick={() => closeNavHandler()}
          >
            <XCircle size={34} />
          </button>
          {updatedCart &&
            updatedCart.map((product: CartModel, index) => (
              <ListItem
                data-key={product.title}
                key={Math.floor(Math.random() * 100000)}
              >
                <ProductWrapper>
                  <div>
                    {product.title}, {product.price * product.quantity} SEK
                    <br />I lager: {product.inStock}
                  </div>
                  <CountContainer>
                    <input
                      type="button"
                      value="-"
                      data-testid="decrease"
                      onClick={() => decrementValue(product, index)}
                      disabled={product.quantity === 1}
                    />
                    <input type="text" readOnly value={product.quantity} />
                    <input
                      type="button"
                      value="+"
                      data-testid="increase"
                      onClick={() => incrementValue(product)}
                      disabled={product.quantity === product.inStock}
                    />
                  </CountContainer>
                  <button
                    onClick={() => {
                      deleteHandler(index);
                    }}
                  >
                    <Trash2 />
                  </button>
                </ProductWrapper>
              </ListItem>
            ))}
          {updatedCart && updatedCart.length > 0 && (
            <p>Totalt: {totalPrice && totalPrice} SEK</p>
          )}
          {(!updatedCart || updatedCart.length === 0) && (
            <p>Kundkorgen är tom! Varför inte shoppa lite?</p>
          )}
          {buyMessage && <Message>{buyMessage}</Message>}
          {!user && (
            <>
              <Message onClick={navigateHandler} style={{cursor: "pointer"}}>
                Du måste vara inloggad för att genomföra ett köp. Logga in här
              </Message>
              <BuyButton disabled>Köp</BuyButton>
            </>
          )}
          {user && <BuyButton onClick={() => onBuyHandler()}>Köp</BuyButton>}
        </ul>
      </ListWrapper>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
`;

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

  h2,
  h3 {
    padding: 1rem 0;
  }

  .show {
    width: 600px;
    max-width: 100%;
  }

  button.close {
    position: absolute;
    top: 25px;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    border-radius: 4px;
    color: ${COLORS.darkGreen};
    background: ${COLORS.lightGreen};
    border: none;

    &:hover {
      background: ${COLORS.primary};
      color: ${COLORS.darkGreen};
    }
  }
`;

const ListItem = styled.li`
  padding: 0.5rem 1rem;
  border: 1px solid black;
`;

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 1fr;
  width: 80%;
  align-items: space between;

  input {
    width: 1.5rem;
    cursor: pointer;
    margin: 0.2rem;
    border: 2px solid ${COLORS.primary};
    border-radius: 4px;
  }

  input[type="button"],
  button {
    color: ${COLORS.darkGreen};
    background: ${COLORS.lightGreen};
    border: 2px solid ${COLORS.primary};

    &:hover {
      background: ${COLORS.primary};
      color: ${COLORS.darkGreen};
    }
  }

  button {
    padding: 0 0.5rem;
    border-radius: 4px;
    margin: 0 auto;

    &:hover {
      background: ${COLORS.primary};
      color: ${COLORS.darkGreen};
    }
  }
`;

const CountContainer = styled.div`
  display: flex;
`;

const Message = styled.p`
  position: absolute;
  bottom: 30%;
  left: 25px;
`;

const BuyButton = styled.button`
  position: absolute;
  bottom: 75px;
  right: 25px;
  padding: .5rem 1rem;
  border: 2px solid ${COLORS.primary};
  border-radius: .5rem;
  color: ${COLORS.darkGreen};
  font-weight: 700;
  background: ${COLORS.lightGreen};

  &:hover {
    background: ${COLORS.primary};
    color: ${COLORS.darkGreen};
  }

  &:disabled {
    background: ${COLORS.primary};
    color: ${COLORS.darkGreen};
    cursor: auto;
  }
`;

export default Cart;
