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
  updateCart,
  getAllProducts,
} from "../../services/productsServices";
import { getUserById } from "../../services/userServices";
import { Product } from "../../models/Product";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import { ShoppingCart } from "react-feather";

function AllProducts() {
  const [products, setProducts] = useState<[] | [Product]>([]);
  const [updatedCart, setUpdatedCart] = useState<Product[] | []>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartId, setCartId] = useState<string>("");
  const [cartOwner, setCartOwner] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const cart = getCartFromLocalStorage();

  const token = getTokenFromLocalStorage();
  const userFromLocalStorage = getUserFromLocalStorage();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const data = await getAllProducts();
    setProducts(data.products);
    const carts = await getAllCarts();
    console.log(carts);
  }

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      getUser(userFromLocalStorage.id);
    } else {
      setIsLoggedIn(false);
    }
  }, [token, userFromLocalStorage?.id]);

  async function getUser(id: string) {
    const userInfo = await getUserById(id);
    setUser(userInfo.user);
  }

  async function addToCartHandler(productObj: object) {
    // if (cartOwner === user?.id) {
    //   const newCart = [productObj, ...updatedCart];
    //   console.log("första", newCart);
      
    //   setUpdatedCart(newCart as Product[]);
    //   const data = await updateCart(updatedCart, cartId);
    //   console.log(data);
    // } else
     if (isLoggedIn) {
      setUpdatedCart(productObj as Product[]);
      const data = await createCart(updatedCart, user as User);
      setCartId(data?.cart?.id);
      setCartOwner(data?.cart?.ownerId);
    } else if (isLoggedIn && user?.carts.length === 0) {
        console.log("tredje");
        
      const newCart = [productObj];
      setUpdatedCart(newCart as Product[]);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else if (!isLoggedIn && cart) {
        console.log("fjärde");
        
      const newCart = [productObj, ...cart];
      setUpdatedCart(newCart as Product[]);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  }

  return (
    <>
      <ShoppingCart size={36} onClick={() => setShowCart(!showCart)} />
      {showCart && <Cart cart={cart} />}
      <ProductCard products={products} addToCartHandler={addToCartHandler} />
    </>
  );
}

export default AllProducts;
