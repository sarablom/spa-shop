import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../Navbar";

// Set up mock for useNavigate and useLocation from react-router-dom
const mockedNavigator = jest.fn();
const mockedLocation = jest.fn();

jest.mock("react-router-dom", () => ({
    useNavigate: () => mockedNavigator,
    useLocation: () => mockedLocation,
  }));

describe("Navbar component", () => {
    it("renders without crashing", () => {
        render(<Navbar />);
    })

    it("user is redirected to HomePage when click Hem", async () => {
        render(<Navbar />);
        const button = screen.getByText("Hem");
    userEvent.click(button);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/");
    });
    })

    it("user is redirected to LoginPage when click Logga in", async () => {
        render(<Navbar />);
        const button = screen.getByText("Logga in");
    userEvent.click(button);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/login");
    });
    })

    it("user is redirected to SignupPage when click Registrera dig", async () => {
        render(<Navbar />);
        const button = screen.getByText("Registrera dig");
    userEvent.click(button);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/signup");
    });
    })
})