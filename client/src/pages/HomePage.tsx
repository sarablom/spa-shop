import { useEffect, useState } from 'react';
import AllProducts from '../components/products/AllProducts';
import styled from "styled-components";
import FilterSearch from '../components/search/FilterSearch';
import { Product } from "../models/Product"
import { getAllProducts} from "../services/productsServices";

function HomePage() {
    //All products in database loads on start
    const [products, setProducts] = useState<[] | [Product]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]); 

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
    </ProductHeaderWrapper>
          
      <AllProducts products={products} filteredProducts={filteredProducts} />
  </main>;
}

const ProductHeaderWrapper = styled.div `
  display: flex;
  justify-content: space-between;
`

export default HomePage;
