import { render } from "@testing-library/react";
import Cart from "../Cart";
import { cartModel } from "../../../dummyData";

const setUpdatedCartMock = jest.fn();
const setAddClassCartElemMock = jest.fn();
const setTotalPriceMock = jest.fn();

const testCartData = [cartModel];
const testClassData = "show";
const testTotalPrice = 550;

describe("Cart component", () => {
  it("renders without crashing", () => {
    render(
      <Cart
        updatedCart={testCartData}
        setUpdatedCart={setUpdatedCartMock}
        setAddClassCartElem={setAddClassCartElemMock}
        addClassCartElem={testClassData}
        totalPrice={testTotalPrice}
        setTotalPrice={setTotalPriceMock}
      />
    );
  });
});
