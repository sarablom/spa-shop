import { render, screen } from "@testing-library/react";
import Cart from "../Cart";
import { cartModel, user } from "../../../dummyData";
import userEvent from "@testing-library/user-event";
import { getUserFromLocalStorage, getCartFromLocalStorage } from "../../../services/localStorageServices";

const setUpdatedCartMock = jest.fn();
const setAddClassCartElemMock = jest.fn();
const setTotalPriceMock = jest.fn();

const testCartData = cartModel;
const testClassData = "show";
const testTotalPrice = 550;
const testUser = user;

//Mock local storage
jest.mock("../../../services/localStorageServices", () => {
  return {
    getUserFromLocalStorage: jest.fn(),
    getCartFromLocalStorage: jest.fn()
  };
});

describe("Cart component", () => {
  beforeEach(() => {
    (getCartFromLocalStorage as jest.Mock).mockReturnValue(testCartData);
    (getUserFromLocalStorage as jest.Mock).mockReturnValue(testUser);
  });

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

  it("increse and decrease buttons are in the document", () => {
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

    const decreaseButton = screen.getByTestId("decrease");
    const increaseButton = screen.getByTestId("increase");

    expect(decreaseButton).toBeInTheDocument();
    expect(increaseButton).toBeInTheDocument();
  });

  it("decreases the number of products when user clicks the decrease button", () => {
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

    const decreaseButton = screen.getByTestId("decrease");
    userEvent.click(decreaseButton);
    expect(setUpdatedCartMock).toBeCalledTimes(1);
  });

  it("increases the number of products when user clicks the increase button", () => {
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

    const increaseButton = screen.getByTestId("increase");
    userEvent.click(increaseButton);
    userEvent.click(increaseButton);
    userEvent.click(increaseButton);
    expect(setUpdatedCartMock).toBeCalledTimes(3);
  });

  // it("product title to be visible", () => {
  //   render(
  //     <Cart
  //       updatedCart={testCartData}
  //       setUpdatedCart={setUpdatedCartMock}
  //       setAddClassCartElem={setAddClassCartElemMock}
  //       addClassCartElem={testClassData}
  //       totalPrice={testTotalPrice}
  //       setTotalPrice={setTotalPriceMock}
  //     />
  //   );
    
  //   const title = screen.getByText(testCartData[0].title);
  //   expect(title).toBeInTheDocument();
  // });

  it("cart closes when user clicks close button", () => {
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

    userEvent.click(screen.getByRole("button", { name: "Stäng" }));
    expect(setAddClassCartElemMock).toBeCalledTimes(1);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
