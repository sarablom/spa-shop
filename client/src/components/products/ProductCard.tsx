import { Product } from "../../models/Product";

import styled from "styled-components";
import { COLORS } from "../../styles/constants";

interface Props {
  products: Product[] | [];
  addToCartHandler: Function;
}

function ProductCard(props: Props) {
  return (
    <>
      <ListWrapper>
        {props.products &&
          props.products.map((product: Product, index) => (
            <ListItem key={product.id + index}>
              <div>
                <img src={product.imgUrl} alt={product.title} />
                <h3>{product.title}</h3>
                <hr />
                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
              <button onClick={() => props.addToCartHandler(product)}>
                Lägg i kundkorg
              </button>
            </ListItem>
          ))}
      </ListWrapper>
    </>
  );
}

const ListWrapper = styled.ul`
  width: 90vw;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1rem;
  width: 100%;
  padding: 32px;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  min-height: 100%;
  border: 1px solid ${COLORS.darkBrown};
  border-radius: 8px;
  padding: 1.5rem;
  margin: 0 auto;
  background: ${COLORS.lightBrown};
  div {
    flex: 1;

    img {
      width: 100%;
      border-radius: 4px 4px 0 0;
    }

    h3,
    p {
      padding: 8px 0;
    }

    hr {
      border-top: 1px solid ${COLORS.darkBrown};
    }
  }

  button {
    padding: .5rem 1rem;
    cursor: pointer;
  }
`;

export default ProductCard;
