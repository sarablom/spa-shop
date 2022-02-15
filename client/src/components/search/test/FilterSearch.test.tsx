import { render, screen } from "@testing-library/react";
import FilterSearch from "../FilterSearch";
import { product } from "../../../dummyData";

const setFilteredProductsMock = jest.fn();
const productTestData = [product];

describe("FilterSearch component", () => {
    it("renders without crashing", () => {
        render(<FilterSearch products={productTestData} setFilteredProducts={setFilteredProductsMock} />)
    })
})