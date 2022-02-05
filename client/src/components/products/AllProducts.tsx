import { useEffect, useState } from 'react';
import { getAllProducts } from "../../services/productsServices";
import { Product } from "../../models/Product";
import ProductCard from './ProductCard';
import styled from "styled-components";

function AllProducts() {
    const [products, setProducts] = useState<[] | [Product]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const data = await getAllProducts();        
        setProducts(data.products);  
    }

  return <Wrapper>
      <ProductCard products={products} />
  </Wrapper>;
}

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default AllProducts;
