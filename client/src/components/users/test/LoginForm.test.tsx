import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";
import {
  saveTokenToLocalStorage,
  saveUserToLocalStorage,
} from "../../../services/localStorageServices";

// Set up mock for useNavigate and useLocation from react-router-dom
const mockedNavigator = jest.fn();
const mockedLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
  useLocation: () => mockedLocation,
}));

//Mock fetch response

let successfulFetchResponse = {
  success: true,
  token: "token",
  user: {
    _id: 1,
    firstName: "First Name",
  },
};

// Mock localStorage

jest.mock("../../../services/localStorageServices", () => {
  return {
    saveUserToLocalStorage: jest.fn(),
    saveTokenToLocalStorage: jest.fn(),
  };
});

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
  useLocation: () => mockedLocation,
}));

describe("LoginForm component", () => {
  it("renders without crashing", () => {
    render(<LoginForm />);
  });

  it("displays two input fields with a type of text", async () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Användarnamn:")).toBeInTheDocument();
    expect(screen.getByLabelText("Lösenord:")).toBeInTheDocument();
  });

  it("displays an input field with the type submit", async () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("button", { name: "Logga in" })
    ).toBeInTheDocument();
  });

  it("displays an error message if user clicks button when input fields are empty", async () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole("button", { name: "Logga in" });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Fyll i användarnamn och lösenord")
      ).toBeInTheDocument();
    });
  });
});

describe("If login is successful", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(successfulFetchResponse),
      })
    ) as jest.Mock<any>;
  });

  it("calls the navigate function to redirect user to the home page", async () => {
    render(<LoginForm />);
    const usernameInput = screen.getByLabelText("Användarnamn:");
    const passwordInput = screen.getByLabelText("Lösenord:");
    const submitButton = screen.getByRole("button", { name: "Logga in" });

    userEvent.type(usernameInput, "userName");
    userEvent.type(passwordInput, "password");

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/");
    });
  });

  it("saves user and token in localstorage", async () => {
    render(<LoginForm />);
    const usernameInput = screen.getByLabelText("Användarnamn:");
    const passwordInput = screen.getByLabelText("Lösenord:");
    const submitButton = screen.getByRole("button", { name: "Logga in" });

    userEvent.type(usernameInput, "userName");
    userEvent.type(passwordInput, "password");

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(saveUserToLocalStorage).toHaveBeenCalledWith(
        successfulFetchResponse.user
      );
    });
    await waitFor(() => {
      expect(saveTokenToLocalStorage).toHaveBeenCalledWith(
        successfulFetchResponse.token
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
