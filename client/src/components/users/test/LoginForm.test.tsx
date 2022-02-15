import { render, screen } from "@testing-library/react";
import LoginForm from "../LoginForm";

// Set up mock for useNavigate and useLocation from react-router-dom
const mockedNavigator = jest.fn();
const mockedLocation = jest.fn();

jest.mock("react-router-dom", () => ({
    useNavigate: () => mockedNavigator,
    useLocation: () => mockedLocation,
  }));

describe("LoginForm component", () => {
    it("renders without crashing", () => {
        render(<LoginForm />)
    })
})