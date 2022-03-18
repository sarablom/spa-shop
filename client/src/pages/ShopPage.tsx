import { useEffect, useState } from "react";
import AllProducts from "../components/products/AllProducts";
import styled from "styled-components";
import FilterSearch from "../components/search/FilterSearch";
import { Product } from "../models/Product";
import { getAllProducts } from "../services/productsServices";
import { ShoppingCart, CheckCircle } from "react-feather";
import { COLORS } from "../styles/constants";
import Cart from "../components/cart/Cart";
import { CartModel } from "../models/Cart";
import { uiActions } from "../store/uiSlice"
import { RootState } from "../store/index";
import { useDispatch, useSelector } from "react-redux";

function ShopPage() {
  //Redux
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state: RootState) => state.ui.cartIsVisible);
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

  //All products in database loads on start
  const [products, setProducts] = useState<[] | [Product]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);
  //Saves upated Cart in a state that can be sent as props
  const [updatedCart, setUpdatedCart] = useState<CartModel[] | [] | null>(null);
  const [addClassCartElem, setAddClassCartElem] = useState<string>("hide");
  const [totalPrice, setTotalPrice] = useState<Number | null>(null);
  const [buyMessageClass, setBuyMessageClass] = useState<string>("hide");


  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const data = await getAllProducts();
    setProducts(data?.products);
    setFilteredProducts(data?.products);
  }

  function toggleCartHandler() {
    dispatch(uiActions.toggle());
    setAddClassCartElem("show");
  }
 
  return (
    <main>
      <ProductHeaderWrapper>
        <FilterSearch
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
        <ShoppingButton onClick={() => toggleCartHandler()}>
          <ShoppingCart size={34} color={COLORS.darkBrown} cursor="pointer" />
          <span>{cartQuantity}</span>
        </ShoppingButton>
      </ProductHeaderWrapper>
      {cartIsVisible && (
        <Cart
          updatedCart={updatedCart}
          setUpdatedCart={setUpdatedCart}
          setAddClassCartElem={setAddClassCartElem}
          addClassCartElem={addClassCartElem}
          setTotalPrice={setTotalPrice}
          totalPrice={totalPrice}
        />
      )}
      <BuyMessage className={buyMessageClass}>
        <CheckCircle /> Varan ligger nu i kundkorgen
      </BuyMessage>
      <AllProducts
        filteredProducts={filteredProducts}
        setUpdatedCart={setUpdatedCart}
        setTotalPrice={setTotalPrice}
        setBuyMessageClass={setBuyMessageClass}
      />
    </main>
  );
}

const ProductHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ShoppingButton = styled.button`
  width: 4rem;
  height: 4rem;
  color: ${COLORS.darkGreen};
  background: ${COLORS.lightGreen};
  border: none;
  position: relative;

  span {
    position: absolute;
    top: 0;
    right: 10px;
  background-color: ${COLORS.primary};
  border-radius: 50%;
  padding: .05rem 0.5rem;
  color: ${COLORS.darkBrown};
  font-weight: 700;
  }
`;

const BuyMessage = styled.div `
  position: fixed;
  bottom: 50px;
  right: 50px;
  background: ${COLORS.lightGreen};
`

export default ShopPage;
