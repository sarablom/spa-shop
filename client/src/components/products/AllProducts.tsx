import { useEffect, useState } from 'react';
import { getAllProducts } from "../../services/productsServices";
import { Product } from "../../models/Product";
import styled from "styled-components";


function AllProducts() {
    const [products, setProducts] = useState<[] | [Product]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const data = await getAllProducts();        
        setProducts(data.products);
        console.log(products);      
    }

  return <div>
      
  </div>;
}

export default AllProducts;
