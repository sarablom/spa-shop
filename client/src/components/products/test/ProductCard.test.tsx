import { render } from "@testing-library/react";
import { product } from "../../../dummyData";
import ProductCard from "../ProductCard";

describe("ProductCard component", () => {
    it("renders without crashing", () => {
        render(<ProductCard products={[product]} />);
    })

    //displays a title
    //displays a description
    //displays a price
})