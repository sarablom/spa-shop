import React from 'react';
import { Product } from "../../models/Product";
import styled from "styled-components";

interface Props {
  products: Product[] | [];
}

function ProductCard(props: Props) {

  

  return <ListWrapper>
    {props.products && props.products.map((product: Product) => (
      <li key={product.id}>
        <h3>{product.title}</h3>
        <img src={product.imgUrl} alt={product.title} />
        <p>{product.description}</p>
        <p>{product.price}</p>
      </li>
    ))}
  </ListWrapper>;
}

const ListWrapper = styled.ul `
  list-style-type: none;
  max-width: 200px;
`

export default ProductCard;
