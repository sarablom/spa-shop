import { useEffect, useState } from "react";
import { User } from "../../models/User";
import {
  getUserFromLocalStorage,
  getTokenFromLocalStorage,
  getCartFromLocalStorage 
} from "../../services/localStorageServices";
import {
  createCart,
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
    if (isLoggedIn && user?.carts.length === 0) {
      setUpdatedCart(productObj as Product[]);
      const data = await createCart(updatedCart, user as User);
      //setCartId(data?.cart?.id);
      console.log(data);
      
    } else if (isLoggedIn) {
      const newCart = [productObj, ...updatedCart];
      setUpdatedCart(newCart as Product[]);
      await updateCart(updatedCart, cartId);
    } else 
    if (!isLoggedIn && !cart) {
      const newCart = [productObj];
      setUpdatedCart(newCart as Product[]);
      localStorage.setItem('cart', JSON.stringify(newCart));    
    } else if (!isLoggedIn && cart) {
        const newCart = [productObj, ...cart];
        setUpdatedCart(newCart as Product[]);
        localStorage.setItem('cart', JSON.stringify(newCart));
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
