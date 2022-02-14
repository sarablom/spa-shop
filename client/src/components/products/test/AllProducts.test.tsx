import { render } from "@testing-library/react";
import AllProducts from "../AllProducts";
import { product } from "../../../dummyData";

const setUpdatedCartMock = jest.fn();
const testProductData = [product];

describe("AllProducts component", () => {
    it("renders without crashing", () => {
        render(<AllProducts filteredProducts={testProductData} setUpdatedCart={setUpdatedCartMock} />);
    })
})