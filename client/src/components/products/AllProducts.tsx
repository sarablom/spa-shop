import { useEffect } from "react";
import { getCartFromLocalStorage } from "../../services/localStorageServices";
import { addTotalPrice } from "../../utils/helperFunctions";
import { Product } from "../../models/Product";
import ProductCard from "./ProductCard";
import { CartModel } from "../../models/Cart";

interface Props {
  filteredProducts: Product[] | [];
  setUpdatedCart: Function;
  setTotalPrice: Function;
}

function AllProducts({
  filteredProducts,
  setUpdatedCart,
  setTotalPrice
}: Props) {
  //Get cart that is saved in LS if user is not logged in
  const cart = getCartFromLocalStorage();

  useEffect(() => {
    if (cart.length > 0) {
      setUpdatedCart(cart);
    }
  }, []);


  async function addToCartHandler(productObj: CartModel) {
    if (!cart) {
        const newCart = [productObj];
        setUpdatedCart(newCart as CartModel[]);
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else if (cart) {
        const productMatch = cart.find((item: CartModel) => item._id === productObj._id)
        
        if (productMatch) {
          const newCart = cart.map((item: any) => {
            const spreadItem = {...item}

            if (item._id === productMatch._id) {
              spreadItem.quantity++;
              console.log(spreadItem.quantity);  
            }
            return spreadItem;
          })
          setUpdatedCart(newCart as CartModel[]);
          localStorage.setItem("cart", JSON.stringify(newCart));
          const sum = addTotalPrice(newCart as CartModel[]);
          setTotalPrice(sum);
        } else {
          productObj.quantity = 1;
          const newCart = [productObj, ...cart];
          setUpdatedCart(newCart as CartModel[]);
          localStorage.setItem("cart", JSON.stringify(newCart));
          const sum = addTotalPrice(newCart as CartModel[]);
          setTotalPrice(sum);
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
