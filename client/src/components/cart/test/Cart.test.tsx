import {render, screen} from "@testing-library/react";
import Cart from "../Cart";
import { cartModel } from "../../../dummyData";

const setUpdatedCartMock = jest.fn();
const setAddClassCartElemMock = jest.fn();

const testCartData = [cartModel];
const testClassData = "show";

describe("Cart component", () => {
    it("renders without crashing", () => {
        render(<Cart updatedCart={testCartData} setUpdatedCart={setUpdatedCartMock} setAddClassCartElem={setAddClassCartElemMock} addClassCartElem={testClassData} />)
    })
})