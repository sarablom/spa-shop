import { getCartFromLocalStorage } from "../../services/localStorageServices";
import { Product } from "../../models/Product";
import ProductCard from "./ProductCard";

interface Props {
  filteredProducts: Product[] | [];
  setUpdatedCart: Function;
}

function AllProducts({
  filteredProducts,
  setUpdatedCart,
}: Props) {
  //Get cart that is saved in LS if user is not logged in
  const cart = getCartFromLocalStorage();

  async function addToCartHandler(productObj: object) {
    if (!cart) {
        const newCart = [productObj];
        setUpdatedCart(newCart as Product[]);
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else if (cart) {
        const newCart = [productObj, ...cart];
        setUpdatedCart(newCart as Product[]);
        localStorage.setItem("cart", JSON.stringify(newCart));
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
