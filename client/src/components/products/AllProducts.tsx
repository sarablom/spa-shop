import { useEffect } from "react";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../../services/localStorageServices";
import { addTotalPrice } from "../../utils/helperFunctions";
import { Product } from "../../models/Product";
import ProductCard from "./ProductCard";
import { CartModel } from "../../models/Cart";

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
  //Get cart that is saved in LS if user is not logged in
  const cart = getCartFromLocalStorage();

  useEffect(() => {
    if (cart?.length > 0) {
      setUpdatedCart(cart);
    }
  }, []);

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

    if (!cart) {
      productObj.quantity = 1;
      const newCart = [productObj];
      successfulAddToCart(newCart);
    } else if (cart) {
      productObj.quantity = 1;
      const productMatch = cart.find(
        (item: CartModel) => item._id === productObj._id
      );

      if (productMatch) {
        productObj.quantity = 1;
        const newCart = cart.map((item: any) => {
          const spreadItem = { ...item };

          if (item._id === productMatch._id) {
            spreadItem.quantity++;
          }
          return spreadItem;
        });
        successfulAddToCart(newCart);
      } else {
        productObj.quantity = 1;
        const newCart = [productObj, ...cart];
        successfulAddToCart(newCart);
      }
    }
  }

  return (
    <ProductCard
      products={filteredProducts}
      addToCartHandler={addToCartHandler}
    />
  );
}

export default AllProducts;
