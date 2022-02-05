import { useEffect, useState } from 'react';
import { getAllProducts } from "../../services/productsServices";
import { Product } from "../../models/Product";
import ProductCard from './ProductCard';

function AllProducts() {
    const [products, setProducts] = useState<[] | [Product]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const data = await getAllProducts();        
        setProducts(data.products);  
    }

  return <>
      <ProductCard products={products} />
  </>;
}

export default AllProducts;
