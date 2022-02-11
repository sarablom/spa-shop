import { useEffect, useState } from "react";
import { User } from "../../models/User";
import {
  getUserFromLocalStorage,
  getTokenFromLocalStorage,
  getCartFromLocalStorage,
} from "../../services/localStorageServices";

import {
  createCart,
  getAllCarts,
  getSingleCart,
  updateCart,
} from "../../services/cartServices";
import { getUserById } from "../../services/userServices";
import { Product } from "../../models/Product";
import { CartObject } from "../../models/Cart";
import ProductCard from "./ProductCard";
import Cart from "../cart/Cart";

interface Props {
  products: Product[] | [];
  filteredProducts: Product[] | [];
  showCart: Boolean;
}

function AllProducts({products, filteredProducts, showCart}: Props) {
  //All carts in database loads on start
  const [carts, setCarts] = useState<[]>([]);
  //Saves cart which ownerid is matching user id
  const [matchingCart, setMatchingCart] = useState<[] | Product[]>([]);
  //Saves upated Cart in a state that can be sent as props
  const [updatedCart, setUpdatedCart] = useState<Product[] | []>([]);
  //Checks LS for token to see if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  //Saves cartId when there is a match between userId and ownerId
  const [cartId, setCartId] = useState<string>("");
  //Get user object based on LS userid
  const [user, setUser] = useState<User | null>(null);
  //Get cart that is saved in LS if user is not logged in
  const cart = getCartFromLocalStorage();

  const token = getTokenFromLocalStorage();
  const userFromLocalStorage = getUserFromLocalStorage();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      getUser(userFromLocalStorage.id);
      getCarts();
      setUpdatedCart(matchingCart);
      findUserCart(carts);
    } else {
      setIsLoggedIn(false);
      setUpdatedCart(cart);
    }
  }, [token]);

  async function getCarts() {
    const data = await getAllCarts();
    setCarts(data.carts);
  }

  function findUserCart(carts: CartObject[]) {
    //Array mehod to find a match
    function findMatchingCart(cart: any) {
      return cart.ownerId === user?.id
    }
    const foundMatch = carts.find(findMatchingCart);
    
    if (foundMatch) {
        setMatchingCart(foundMatch.cart);
        setCartId(foundMatch.id);
    }
  }

  async function getUser(id: string) {
    const userInfo = await getUserById(id);
    setUser(userInfo.user);
  }

  async function addToCartHandler(productObj: object) {
    if (isLoggedIn && matchingCart.length > 0) {
      const cartData = [productObj, ...updatedCart]
      const data = await updateCart(cartData as Product[], cartId);
      setUpdatedCart(data.cart.cart);
      
      
      // const singleCartData = await getSingleCart(cartId);
      // const cartData = singleCartData.cart.cart;
      // const newCart = [productObj, ...cartData];
      
      // setUpdatedCart(newCart as Product[]);
      
    } else if (isLoggedIn && matchingCart.length === 0) {
      setUpdatedCart([productObj] as Product[]);
      await createCart(productObj as Product[], user as User);  
    } else if (!isLoggedIn && !cart) {
      const newCart = [productObj];
      setUpdatedCart(newCart as Product[]);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else if (!isLoggedIn && cart) {
      const newCart = [productObj, ...cart];
      setUpdatedCart(newCart as Product[]);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  }

  return (
    <>
 
      {showCart && <Cart cart={updatedCart} />}
      <ProductCard products={filteredProducts} addToCartHandler={addToCartHandler} />
    </>
  );
}

export default AllProducts;
