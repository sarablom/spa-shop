import { render, screen, waitFor } from "@testing-library/react";
import SignupForm from "../SignupForm";
import userEvent from "@testing-library/user-event";
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

//Mock local storage
jest.mock("../../../services/localStorageServices", () => {
  return {
    saveUserToLocalStorage: jest.fn(),
    saveTokenToLocalStorage: jest.fn(),
  };
});

let successfulFetchResponse = {
  success: true,
  token: "token",
  user: {
    _id: 1,
    userName: "username",
    firstName: "First Name",
    lastName: "Last Name",
    address: "Address",
    zipCode: "34567",
    city: "City"
  },
};

describe("SignupForm component", () => {
  it("renders without crashing", () => {
    render(<SignupForm />);
  });

  it("displays five input fields", () => {
    render(<SignupForm />);

    expect(screen.getByLabelText("Användarnamn:")).toBeInTheDocument();
    expect(screen.getByLabelText("Lösenord:")).toBeInTheDocument();
    expect(screen.getByLabelText("Förnamn:")).toBeInTheDocument();
    expect(screen.getByLabelText("Efternamn:")).toBeInTheDocument();
    expect(screen.getByLabelText("Adress:")).toBeInTheDocument();
    expect(screen.getByLabelText("Postnummer:")).toBeInTheDocument();
    expect(screen.getByLabelText("Stad:")).toBeInTheDocument();
  });

  it("displays a submit button", () => {
    render(<SignupForm />);

    expect(
      screen.getByRole("button", { name: "Registrera dig" })
    ).toBeInTheDocument();
  });

  it("displays errormessage when not all fields are filled out", () => {
    render(<SignupForm />);

    const firstNameInput = screen.getByLabelText("Förnamn:");

    const buttonElement = screen.getByRole("button", {
      name: "Registrera dig",
    });

    userEvent.type(firstNameInput, "password");
    userEvent.click(buttonElement);

    expect(
      screen.getByText(
        "Du måste fylla i alla fält för att kunna registrera dig."
      )
    ).toBeInTheDocument();
  });
});

describe("If signup was successful", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(successfulFetchResponse),
      })
    ) as jest.Mock<any>;
  });

  it("displays a success message on screen", async () => {
    render(<SignupForm />);

    const buttonElement = screen.getByRole("button", {
      name: "Registrera dig",
    });

    userEvent.type(screen.getByLabelText("Användarnamn:"), "username");
    userEvent.type(screen.getByLabelText("Lösenord:"), "password");
    userEvent.type(screen.getByLabelText("Förnamn:"), "First Name");
    userEvent.type(screen.getByLabelText("Efternamn:"), "Last Name:");
    userEvent.type(screen.getByLabelText("Adress:"), "address");
    userEvent.type(screen.getByLabelText("Postnummer:"), "34567");
    userEvent.type(screen.getByLabelText("Stad:"), "City");

    userEvent.click(buttonElement);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Du har skapat en användare, vi dirigerar dig till startsidan."
        )
      ).toBeInTheDocument();
    });
  });

  it("saves the token in localStorage", async () => {
    render(<SignupForm />);

    const buttonElement = screen.getByRole("button", {
      name: "Registrera dig",
    });

    userEvent.type(screen.getByLabelText("Användarnamn:"), "username");
    userEvent.type(screen.getByLabelText("Lösenord:"), "password");
    userEvent.type(screen.getByLabelText("Förnamn:"), "First Name");
    userEvent.type(screen.getByLabelText("Efternamn:"), "Last Name:");
    userEvent.type(screen.getByLabelText("Adress:"), "address");
    userEvent.type(screen.getByLabelText("Postnummer:"), "34567");
    userEvent.type(screen.getByLabelText("Stad:"), "City");

    userEvent.click(buttonElement);

    await waitFor(() => {
      expect(saveTokenToLocalStorage).toHaveBeenCalledWith(
        successfulFetchResponse.token
      );
    });
  });

  it("saves the user in localStorage", async () => {
    render(<SignupForm />);

    const buttonElement = screen.getByRole("button", {
      name: "Registrera dig",
    });

    userEvent.type(screen.getByLabelText("Användarnamn:"), "username");
    userEvent.type(screen.getByLabelText("Lösenord:"), "password");
    userEvent.type(screen.getByLabelText("Förnamn:"), "First Name");
    userEvent.type(screen.getByLabelText("Efternamn:"), "Last Name:");
    userEvent.type(screen.getByLabelText("Adress:"), "address");
    userEvent.type(screen.getByLabelText("Postnummer:"), "34567");
    userEvent.type(screen.getByLabelText("Stad:"), "City");

    userEvent.click(buttonElement);

    await waitFor(() => {
      expect(saveUserToLocalStorage).toHaveBeenCalledWith(
        successfulFetchResponse.user
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});