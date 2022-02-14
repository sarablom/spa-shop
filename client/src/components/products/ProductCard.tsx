import { Product } from "../../models/Product";

import styled from "styled-components";
import { COLORS } from "../../styles/constants";

interface Props {
  products: Product[] | [];
  addToCartHandler: Function;
}

function ProductCard({products, addToCartHandler}: Props) {
  return (
    <>
      <ListWrapper>
        {products &&
          products.map((product: Product, index) => (
            <ListItem key={Math.floor(Math.random() * 100000)}>
              <div>
                <img src={product.imgUrl} alt={product.title} />
                <h3>{product.title}</h3>
                <hr />
                <p>{product.description}</p>
                <p>{product.price}</p>
                <small>Lagerstatus: {product.inStock}</small>
              </div>
              <button onClick={() => addToCartHandler(product)}>
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
  border: 2px solid ${COLORS.darkBrown};
  box-shadow: 0px 0.25rem 0.25rem ${COLORS.mediumBrown};
  border-radius: 8px;
  padding: 1.5rem;
  margin: 0 auto;
  background: ${COLORS.extraLightGreen};
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
