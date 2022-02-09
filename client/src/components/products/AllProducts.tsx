import { useEffect, useState } from "react";
import { User } from "../../models/User";
import {
  getUserFromLocalStorage,
  getTokenFromLocalStorage,
  getCartFromLocalStorage,
} from "../../services/localStorageServices";
import { getAllProducts} from "../../services/productsServices";
import {
  createCart,
  getAllCarts,
  updateCart,
} from "../../services/cartServices";
import { getUserById } from "../../services/userServices";
import { Product } from "../../models/Product";
import { CartModel, CartObject } from "../../models/Cart";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import { ShoppingCart } from "react-feather";

function AllProducts() {
  //All products in database loads on start
  const [products, setProducts] = useState<[] | [Product]>([]);
  //All carts in database loads on start
  const [carts, setCarts] = useState<[]>([]);
  //Saves cart which ownerid is matching user id
  const [matchingCart, setMatchingCart] = useState<[] | CartModel[]>([]);
  //Saves upated Cart in a state that can be sent as props
  const [updatedCart, setUpdatedCart] = useState<Product[] | []>([]);
  //Checks LS for token to see if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  //Shows or hides cart when user clicks cart symbol
  const [showCart, setShowCart] = useState<boolean>(false);
  //Saves cartId
  const [cartId, setCartId] = useState<string>("");
 
  //Get user object based on LS userid
  const [user, setUser] = useState<User | null>(null);
  //Get cart that is saved in LS if user is not logged in
  const cart = getCartFromLocalStorage();

  const token = getTokenFromLocalStorage();
  const userFromLocalStorage = getUserFromLocalStorage();

  useEffect(() => {
    getProducts();
    getCarts();
  }, []);


  async function getProducts() {
    const data = await getAllProducts();
    setProducts(data.products);
  }

  async function getCarts() {
    const data = await getAllCarts();
    setCarts(data.carts);
    findUserCart(data.carts);
  }

  function findUserCart(carts: CartObject[]) {
    console.log(carts);
    
    //Array mehod to find a match
    function findMatchingCart(cart: any) {
      return cart.ownerId === user?.id
    }
    const foundMatch = carts.find(findMatchingCart);
    console.log(foundMatch);
    
    if (foundMatch) {
        setMatchingCart(foundMatch?.cart)
    }
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
      //setCartOwner(data?.cart?.ownerId);
    } else if (isLoggedIn && user?.carts.length === 0) {
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
      <ShoppingCart size={36} onClick={() => setShowCart(!showCart)} />
      {showCart && <Cart cart={cart} />}
      <ProductCard products={products} addToCartHandler={addToCartHandler} />
    </>
  );
}

export default AllProducts;
