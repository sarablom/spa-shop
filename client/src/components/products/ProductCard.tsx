import { Product } from "../../models/Product";
import styled from "styled-components";
import { COLORS } from "../../styles/constants";
// import { cartActions } from "../../store/cartSlice";
// import { RootState } from "../../store/index";
// import { useDispatch, useSelector } from "react-redux";

interface Props {
  products: Product[] | [];
  addToCartHandler: Function;
  disabledButton: boolean;
}

function ProductCard({ products, addToCartHandler, disabledButton }: Props) {
   //Redux
  //  const dispatch = useDispatch();
  //  useSelector((state: RootState) => state.cart.);

  return (
    <>
      <ListWrapper>
        {(!products || products.length === 0) && <p>Kan inte ladda produkter</p>}
        {products && products.length > 0 &&
          products.map((product: Product, index) => (
            <ListItem key={Math.floor(Math.random() * 100000)}>
              <div>
                <img src={product.imgUrl} alt={product.title} />
                <h3>{product.title}</h3>
                <hr />
                <p>{product.description}</p>
                <p>{product.price} SEK</p>
                <small>Lagerstatus: {product.inStock}</small>
              </div>
              <button
                onClick={() => addToCartHandler(product)}
                disabled={disabledButton}
              >
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
  width: 90%;
  max-width: 1300px;
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
    padding: 0.5rem 1rem;
    border-radius: 8px;
    color: ${COLORS.darkBrown};
    background: ${COLORS.extraLightGreen};
    border: 2px solid ${COLORS.darkBrown};

    &:hover {
      background: ${COLORS.lightBrown};
    }

    &:disabled {
      background: ${COLORS.darkBrown};
      cursor: auto;
    }
  }
`;

export default ProductCard;
