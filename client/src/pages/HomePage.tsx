import { useEffect, useState } from "react";
import AllProducts from "../components/products/AllProducts";
import styled from "styled-components";
import FilterSearch from "../components/search/FilterSearch";
import { Product } from "../models/Product";
import { CartObject } from "../models/Cart";
import { User } from "../models/User";
import { getAllProducts } from "../services/productsServices";
import { ShoppingCart } from "react-feather";
import { getSingleCart, getAllCarts } from "../services/cartServices";
import { COLORS } from "../styles/constants";

function HomePage() {
  //All products in database loads on start
  const [products, setProducts] = useState<[] | [Product]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  //Returns true when ownerid is matching user id
  const [matchingCart, setMatchingCart] = useState<boolean>(false);
  //Saves cartId when there is a match between userId and ownerId
  const [cartId, setCartId] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  //Saves upated Cart in a state that can be sent as props
  const [updatedCart, setUpdatedCart] = useState<Product[] | [] | null>(null);
  const [carts, setCarts] = useState<[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    lookingForMatchingCart(carts);
  }, [updatedCart]);

  useEffect(() => {
    if (matchingCart) {
      getCart();
    }
  }, [matchingCart]);

  async function getProducts() {
    const data = await getAllProducts();
    setProducts(data.products);
    setFilteredProducts(data.products);
  }

  function lookingForMatchingCart(carts: CartObject[]) {
    function findMatchingCart(cart: any) {
      return cart.ownerId === user?._id;
    }
    const foundMatch = carts.find(findMatchingCart);

    if (foundMatch) {
      setMatchingCart(true);
      console.log(foundMatch._id);

      setCartId(foundMatch._id);
    }
  }

  async function getCart() {
    const data = await getSingleCart(cartId);
    console.log(data);
    
    if (data.success) {
      setUpdatedCart(data.carts[0].cart);
    }
  }

  async function getCarts() {
    const data = await getAllCarts();
    if (data.carts) {
      setCarts(data.carts);
    }
  }

  return (
    <main>
      <ProductHeaderWrapper>
        <FilterSearch
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
        <ShoppingCart
          size={34}
          color={COLORS.darkBrown}
          cursor="pointer"
          onClick={() => setShowCart(!showCart)}
        />
      </ProductHeaderWrapper>
      <AllProducts
        filteredProducts={filteredProducts}
        showCart={showCart}
        setUpdatedCart={setUpdatedCart}
        getCarts={getCarts}
        setUser={setUser}
        matchingCart={matchingCart}
        updatedCart={updatedCart as Product[]}
        cartId={cartId}
        user={user}
      />
    </main>
  );
}

const ProductHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
`;

export default HomePage;
