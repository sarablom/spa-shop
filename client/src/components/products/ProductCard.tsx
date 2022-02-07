import React from 'react';
import { Product } from "../../models/Product";
import styled from "styled-components";
import { COLORS } from '../../styles/constants';

interface Props {
  products: Product[] | [];
}

function ProductCard(props: Props) {

  return <ListWrapper>
    {props.products && props.products.map((product: Product) => (
      <ListItem key={product.id}>
        <img src={product.imgUrl} alt={product.title} />
        <h3>{product.title}</h3>
        <hr />
        <p>{product.description}</p>
        <p>{product.price}</p>
        <button>Lägg i kundkorg</button>
      </ListItem>
    ))}
  </ListWrapper>;
}

const ListWrapper = styled.ul `
  width: 90vw;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1rem;
  width: 100%;
  padding: 32px;
`

const ListItem = styled.li `
  max-width: 300px;
  border: 1px solid ${COLORS.darkBrown};
  border-radius: 8px;
  padding: 1.5rem;
  margin: 0 auto;
  background: ${COLORS.lightBrown};

  img {
    width: 100%;
    border-radius: 4px 4px 0 0;
  }

  h3, p {
    padding: 8px 0;
  }

  hr {
    border-top: 1px solid ${COLORS.darkBrown}
  }
`

export default ProductCard;
