import { useEffect, useState } from "react";
import AllProducts from "../components/products/AllProducts";
import styled from "styled-components";
import FilterSearch from "../components/search/FilterSearch";
import { Product } from "../models/Product";
import { getAllProducts } from "../services/productsServices";
import { ShoppingCart } from "react-feather";
import { COLORS } from "../styles/constants";
import Cart from "../components/cart/Cart";
import { CartModel } from "../models/Cart";

function HomePage() {
  //All products in database loads on start
  const [products, setProducts] = useState<[] | [Product]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  //Saves upated Cart in a state that can be sent as props
  const [updatedCart, setUpdatedCart] = useState<CartModel[] | [] | null>(null);
  const [addClassCartElem, setAddClassCartElem] = useState<string>("hide");
  const [totalPrice, setTotalPrice] = useState<Number | null>(null);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const data = await getAllProducts();
    setProducts(data.products);
    setFilteredProducts(data.products);
  }

  function openCart() {
    setShowCart(!showCart);
    setAddClassCartElem("show");
  }

  return (
    <main>
      <ProductHeaderWrapper>
        <FilterSearch
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
        <ShoppingButton onClick={() => openCart()}>
          <ShoppingCart size={34} color={COLORS.darkBrown} cursor="pointer" />
        </ShoppingButton>
      </ProductHeaderWrapper>
      {showCart && (
        <Cart
          updatedCart={updatedCart}
          setUpdatedCart={setUpdatedCart}
          setAddClassCartElem={setAddClassCartElem}
          addClassCartElem={addClassCartElem}
          setTotalPrice={setTotalPrice}
          totalPrice={totalPrice}
        />
      )}
      <AllProducts
        filteredProducts={filteredProducts}
        setUpdatedCart={setUpdatedCart}
        setTotalPrice={setTotalPrice}
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

const ShoppingButton = styled.button`
  width: 4rem;
  height: 4rem;
  color: ${COLORS.darkGreen};
  background: ${COLORS.lightGreen};
  border: none;

  & > * {
    pointer-events: none;
  }
`;

export default HomePage;
