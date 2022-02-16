import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSearch from "../FilterSearch";
import { products } from "../../../dummyData";

const setFilteredProductsMock = jest.fn();
const productTestData = products;

describe("FilterSearch component", () => {
    it("renders without crashing", () => {
        render(<FilterSearch products={productTestData} setFilteredProducts={setFilteredProductsMock} />)
    })

    it("displays an input element", () => {
        render(<FilterSearch products={productTestData} setFilteredProducts={setFilteredProductsMock} />)
    
        expect(screen.getByRole("textbox")).toBeInTheDocument();
      });

      it('starts filtering when user is typing', () => {
        render(<FilterSearch products={productTestData} setFilteredProducts={setFilteredProductsMock} />)
    
        const inputElem = screen.getByRole("textbox");
        userEvent.type(inputElem, 'mass');
    
        expect(setFilteredProductsMock).toHaveBeenCalledTimes(4);
      });
})