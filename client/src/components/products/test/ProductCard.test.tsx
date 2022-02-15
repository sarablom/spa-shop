import { render, screen } from "@testing-library/react";
import { products } from "../../../dummyData";
import ProductCard from "../ProductCard";

const addToCartHandlerMock = jest.fn();
const productTestData = products;

describe("ProductCard component", () => {
    it("renders without crashing", () => {
        render(<ProductCard products={productTestData} addToCartHandler={addToCartHandlerMock} />);
    })

    it("displays the titles a list of products", () => {
        render(<ProductCard products={productTestData} addToCartHandler={addToCartHandlerMock} />)

        const firstElementTitle = productTestData[0].title;
        const lastElementTitle = productTestData[productTestData.length - 1].title;

        expect(screen.getByText(firstElementTitle)).toBeInTheDocument();
        expect(screen.getByText(lastElementTitle)).toBeInTheDocument();
    })

    it("displays the description of a list of products", () => {
        render(<ProductCard products={productTestData} addToCartHandler={addToCartHandlerMock} />)

        const firstElementTitle = productTestData[0].description;
        const lastElementTitle = productTestData[productTestData.length - 1].description;

        expect(screen.getByText(firstElementTitle)).toBeInTheDocument();
        expect(screen.getByText(lastElementTitle)).toBeInTheDocument();
    })

    it("displays the price of a list of products", () => {
        render(<ProductCard products={productTestData} addToCartHandler={addToCartHandlerMock} />)

        const firstElementTitle = productTestData[0].price;
        const lastElementTitle = productTestData[productTestData.length - 1].price;

        expect(screen.getByText(firstElementTitle)).toBeInTheDocument();
        expect(screen.getByText(lastElementTitle)).toBeInTheDocument();
    })
})