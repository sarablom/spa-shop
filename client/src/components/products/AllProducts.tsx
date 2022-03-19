import { useEffect, useState } from "react";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../../services/localStorageServices";
import { addTotalPrice } from "../../utils/helperFunctions";
import { Product } from "../../models/Product";
import ProductCard from "./ProductCard";
import { CartModel } from "../../models/Cart";
import { cartActions } from "../../store/cartSlice"
import { useDispatch } from "react-redux";

interface Props {
  filteredProducts: Product[] | [];
  setUpdatedCart: Function;
  setTotalPrice: Function;
  setBuyMessageClass: Function;
}

function AllProducts({
  filteredProducts,
  setUpdatedCart,
  setTotalPrice,
  setBuyMessageClass,
}: Props) {
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  //Get cart that is saved in LS if user is not logged in
  const cart = getCartFromLocalStorage();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart?.length > 0) {
      setUpdatedCart(cart);
    }
  }, []);

  function successfulAddToCart (newCart: CartModel[]) {
    dispatch(cartActions.addItemToCart());
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
    <ProductCard
      products={filteredProducts}
      addToCartHandler={addToCartHandler}
      disabledButton={disabledButton}
    />
  );
}

export default AllProducts;
