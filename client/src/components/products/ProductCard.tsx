import { Product } from "../../models/Product";
import styled from "styled-components";
import { COLORS } from "../../styles/constants";

interface Props {
    product: Product;
    addToCartHandler: Function;
    disabledButton: boolean;
}

function ProductCard({ product, addToCartHandler, disabledButton }: Props) {
    const { imgUrl, title, description, price, inStock } = product;

    return (
        <ListItem key={Math.floor(Math.random() * 100000)}>
            <div>
                <img src={imgUrl} alt={title} />
                <h3>{title}</h3>
                <hr />
                <p>{description}</p>
                <p>{price} SEK</p>
                <small>Lagerstatus: {inStock}</small>
            </div>
            <button
                onClick={() => addToCartHandler(product)}
                disabled={disabledButton}
            >
                Lägg i kundkorg
            </button>
        </ListItem>
    );
}

const ListItem = styled.li`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    min-height: fit-content;
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
