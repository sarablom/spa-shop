import { useEffect, useState } from 'react';
import AllProducts from '../components/products/AllProducts';
import styled from "styled-components";
import FilterSearch from '../components/search/FilterSearch';
import { Product } from "../models/Product"
import { getAllProducts} from "../services/productsServices";
import { ShoppingCart } from "react-feather";

function HomePage() {
    //All products in database loads on start
    const [products, setProducts] = useState<[] | [Product]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]); 
  const [showCart, setShowCart] = useState<boolean>(false);

  useEffect(() => {
    getProducts(); 
  }, []);

  async function getProducts() {
    const data = await getAllProducts();
    setProducts(data.products);
    setFilteredProducts(data.products);
  }

  return <main>
    <ProductHeaderWrapper>
    <FilterSearch products={products}  setFilteredProducts={setFilteredProducts} />
    <ShoppingCart size={36} onClick={() => setShowCart(!showCart)} />
    </ProductHeaderWrapper>
          
      <AllProducts products={products} filteredProducts={filteredProducts} showCart={showCart} />
  </main>;
}

const ProductHeaderWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export default HomePage;
