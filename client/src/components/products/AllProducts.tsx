import { useEffect, useState } from "react";
import { User } from "../../models/User";
import {
  getUserFromLocalStorage,
  getTokenFromLocalStorage,
  getCartFromLocalStorage,
} from "../../services/localStorageServices";
import { createCart, updateCart } from "../../services/cartServices";
import { getUserById } from "../../services/userServices";
import { Product } from "../../models/Product";

import ProductCard from "./ProductCard";
import Cart from "../cart/Cart";

interface Props {
  filteredProducts: Product[] | [];
  showCart: Boolean;
  setUpdatedCart: Function;
  getCarts: Function;
  setUser: Function;
  matchingCart: Boolean;
  updatedCart: Product[] | [] | null;
  cartId: string;
  user: User | null;
}

function AllProducts({
  filteredProducts,
  showCart,
  setUpdatedCart,
  getCarts,
  setUser,
  matchingCart,
  updatedCart,
  cartId,
  user,
}: Props) {
  //Checks LS for token to see if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  //Get cart that is saved in LS if user is not logged in
  const cart = getCartFromLocalStorage();
  const token = getTokenFromLocalStorage();
  const userFromLocalStorage = getUserFromLocalStorage();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      getUser(userFromLocalStorage._id);
      getCarts();
    } else {
      setIsLoggedIn(false);
      setUpdatedCart(cart);
    }
  }, []);

  async function getUser(id: string) {
    console.log(id, "id getuser");
    
    const userInfo = await getUserById(id);
    console.log(userInfo, "userinfo");
    
    setUser(userInfo.user);
  }
  console.log(isLoggedIn, matchingCart, updatedCart);
  

  async function addToCartHandler(productObj: object) {
    if (isLoggedIn && matchingCart && updatedCart) {
      console.log("1");
      
      const cartData = [productObj, ...updatedCart];
      const data = await updateCart(cartData as Product[], cartId);
      setUpdatedCart(data.cart.cart);
    } else if (isLoggedIn && !matchingCart) {
      console.log("2");
      
      setUpdatedCart([productObj] as Product[]);
      await createCart(productObj as Product[], user as User);
    } else if (!isLoggedIn && !cart) {
      console.log("3");
      
      const newCart = [productObj];
      setUpdatedCart(newCart as Product[]);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else if (!isLoggedIn && cart) {
      console.log("4");
      
      const newCart = [productObj, ...cart];
      setUpdatedCart(newCart as Product[]);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  }

  return (
    <>
      {showCart && <Cart cart={updatedCart} />}
      <ProductCard
        products={filteredProducts}
        addToCartHandler={addToCartHandler}
      />
    </>
  );
}

export default AllProducts;
