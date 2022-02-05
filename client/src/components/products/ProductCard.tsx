import React from 'react';
import { Product } from "../../models/Product";
import styled from "styled-components";

interface Props {
  products: Product[] | [];
}

function ProductCard(props: Props) {

  

  return <ListWrapper>
    {props.products && props.products.map((product: Product) => (
      <ListItem key={product.id}>
        <h3>{product.title}</h3>
        <img src={product.imgUrl} alt={product.title} />
        <p>{product.description}</p>
        <p>{product.price}</p>
        <button>ADD TO CART</button>
      </ListItem>
    ))}
  </ListWrapper>;
}

const ListWrapper = styled.ul `
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1rem;
  width: 100%;
`

const ListItem = styled.li `
  max-width: 300px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 1rem;

  img {
    width: 100%;
  }
`

export default ProductCard;
