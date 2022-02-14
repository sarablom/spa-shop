import { render } from "@testing-library/react";
import { product } from "../../../dummyData";
import ProductCard from "../ProductCard";

const addToCartHandlerMock = jest.fn();

describe("ProductCard component", () => {
    it("renders without crashing", () => {
        render(<ProductCard products={[product]} addToCartHandler={addToCartHandlerMock} />);
    })

    //displays a title
    //displays a description
    //displays a price
})