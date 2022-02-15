import { CartModel } from "../../models/Cart";
import styled from "styled-components";
import { saveCartToLocalStorage, getUserFromLocalStorage } from "../../services/localStorageServices";
import { addTotalPrice } from "../../utils/helperFunctions";
import { COLORS } from "../../styles/constants";

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
  totalPrice
}: Props) {
  
const user = getUserFromLocalStorage();

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

  function decrementValue (product: CartModel, index: number) {
        const productMatch = updatedCart?.find((item: CartModel) => item._id ===product._id);

    const newCart = updatedCart?.map((item: CartModel) => {
      const spreadItem = {...item}

            if ((item._id === productMatch?._id) && product.quantity > 0) {
              spreadItem.quantity--; 
            } else if (product.quantity === 0) {
              deleteHandler(index);
            }
            return spreadItem;
          })
          setUpdatedCart(newCart as CartModel[]);
          localStorage.setItem("cart", JSON.stringify(newCart));
          const sum = addTotalPrice(newCart as CartModel[]);
          setTotalPrice(sum as number);
  }

  function incrementValue (product: CartModel) {
    const productMatch = updatedCart?.find((item: CartModel) => item._id ===product._id);

    const newCart = updatedCart?.map((item: CartModel) => {
      const spreadItem = {...item}

            if (item._id === productMatch?._id) {
              spreadItem.quantity++;
              console.log(spreadItem.quantity);  
            }
            return spreadItem;
          })
          setUpdatedCart(newCart as CartModel[]);
          localStorage.setItem("cart", JSON.stringify(newCart));
          const sum = addTotalPrice(newCart as CartModel[]);
          setTotalPrice(sum as number);
  }

  return (
    <ListWrapper>
      <ul className={addClassCartElem}>
        <h2>Kundkorg</h2>
        <hr />
        <h3>Hej {user.firstName}, välkommen till din kundkorg!</h3>
        <button className="close" onClick={() => closeNavHandler()}>
          {/* &times; */} Stäng
        </button>
        {updatedCart &&
          updatedCart.map((product: CartModel, index) => (
            <ListItem
              data-key={product.title}
              key={Math.floor(Math.random() * 100000)}
            >
              <ProductWrapper>
                <span>
                  {product.title}, {(Number(product.price.split(" ")[0])) * product.quantity} SEK
                </span>
                <CountContainer>
                  <input type="button" value="-" onClick={() => decrementValue(product, index)} />
                  <input type="text" readOnly value={product.quantity} />
                  <input type="button" value="+" onClick={() => incrementValue(product)} />
                </CountContainer>
                <button
                  onClick={() => {
                    deleteHandler(index);
                  }}
                >
                  X
                </button>
              </ProductWrapper>
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
    color: ${COLORS.darkBrown};
  }

  h2, h3 {
    padding: 1rem 0;
  }

  .show {
    width: 50%;
    min-width: 600px;
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
    cursor: pointer;
  }
`;

const ListItem = styled.li`
  padding: 0.5rem 1rem;
`;

const ProductWrapper = styled.div `
    display grid;
    grid-template-columns: 4fr 2fr 1fr;
    width: 80%;
    align-items: space between;

  input {
    width: 1.5rem;
    cursor: pointer;
  }

  button {
    /* margin-left: 1rem; */
    width: 1.5rem;
    cursor: pointer;
  } 
`;


const CountContainer = styled.div `
  display: flex;
`;

export default Cart;
