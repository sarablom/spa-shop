import { useEffect, useState } from "react";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../../services/localStorageServices";
import { addTotalPrice } from "../../utils/helperFunctions";
import { Product } from "../../models/Product";
import ProductCard from "./ProductCard";
import { CartModel } from "../../models/Cart";
import { products } from "../../dummyData";
import styled from "styled-components";

interface Props {
  filteredProducts: Product[] | [];
  setUpdatedCart: Function;
  setTotalPrice: Function;
  setBuyMessageClass: Function;
}

const cart = getCartFromLocalStorage();

function AllProducts({
  filteredProducts,
  setUpdatedCart,
  setTotalPrice,
  setBuyMessageClass,
}: Props) {
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  //Get cart that is saved in LS if user is not logged in

  useEffect(() => {
    if (cart && cart?.length > 0) {
      setUpdatedCart(cart);
    }
  }, [setUpdatedCart]);

  function successfulAddToCart (newCart: CartModel[]) {
    setUpdatedCart(newCart as CartModel[]);
    saveCartToLocalStorage(newCart);
    const sum = addTotalPrice(newCart as CartModel[]);
    setTotalPrice(sum);
    setBuyMessageClass("show");
    setTimeout(() => {
      setBuyMessageClass("hide");
    }, 2000);
  }

  async function addToCartHandler(productObj: CartModel) {   
    if (productObj.inStock === 0) {
      return null;
    }

    if (!cart || cart?.length <= 0) {
      productObj.quantity = 1;
      const newCart = [productObj];
      if (productObj.inStock >= productObj.quantity) {
        successfulAddToCart(newCart);
      } else {
        return null;
      }
    } else if (cart) {
      const productMatch = cart.find(
        (item: CartModel) => item._id === productObj._id
      );

      if (productMatch) {
        const newCart = cart.map((item: any) => {
          const spreadItem = { ...item };

          if (item._id === productMatch._id) {
            spreadItem.quantity++;
          }
          return spreadItem;
        });
        if (productObj.inStock >= productObj.quantity) {
          successfulAddToCart(newCart);
        } else {
          return null;
        }
      } else {
        productObj.quantity = 1;
        const newCart = [productObj, ...cart];
        if (productObj.inStock >= productObj.quantity) {
          successfulAddToCart(newCart);
        } else {
          setDisabledButton(true);
          return null;
        }
      }
    }
  }

  return (
    <ListWrapper>
    {(!products || products.length === 0) && <p>Kan inte ladda produkter</p>}

    {filteredProducts && filteredProducts.length > 0 &&
    filteredProducts.map((product) => (
      <ProductCard
        product={product}
        addToCartHandler={addToCartHandler}
        disabledButton={disabledButton}
      />

    ))
  }
     </ListWrapper>
  );
}

export default AllProducts;

const ListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1rem;
  width: 90vw;
  max-width: 1300px;
  list-style-type: none;
  margin: 0 auto;
  padding: 32px;
`;
