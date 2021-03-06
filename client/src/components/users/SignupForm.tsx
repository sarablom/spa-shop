import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authServices";
import {
  saveTokenToLocalStorage,
} from "../../services/localStorageServices";
import styled from "styled-components";
import { COLORS } from "../../styles/constants";
//import { CheckCircle, X, User } from "react-feather";

function SignupForm() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [errorClassName, setErrorClassName] = useState<string>("hidden");

  const [errorMessage, setErrorMessage] = useState<string>("Errormeddelande");
  const navigate = useNavigate();

  function displayMessage(error: string) {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorClassName("hidden");
      setErrorMessage("Errormeddelande");
    }, 10000);
  }

  function clearAllInputfields() {
    setUserName("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setZipCode("");
    setCity("");
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !userName ||
      !password ||
      !firstName ||
      !lastName ||
      !address ||
      !zipCode ||
      !city
    ) {
      setErrorClassName("");
      displayMessage(
        "Du måste fylla i alla fält för att kunna registrera dig."
      );
      return;
    } else if (password.length < 8) {
      setErrorClassName("");
      displayMessage(
        "Ditt lösenord måste vara minst 8 karaktärer långt."
      );
      
    } else if (zipCode.match(/[0-9 ]+/) === null) {
      setErrorClassName("");
      displayMessage(
        "Postnumret får endast innehålla siffror."
      );
      return;
    } else if (firstName.match(/^[a-zA-ZåäöüßÅÄÖÜ]+$/g) === null || lastName.match(/^[a-zA-ZåäöüßÅÄÖÜ]+$/g) === null) {
      setErrorClassName("");
      displayMessage(
        "Namnet får endast innehålla bokstäver."
      );
      return;
    }

    const signupData = await signup(
      userName,
      password,
      firstName,
      lastName,
      address,
      Number(zipCode.replace(/ /g,'')),
      city
    );    
    
    if (signupData?.error) {
      if (signupData.message === 11000) {
        setErrorClassName("");
        displayMessage("Användarnamnet är upptaget.");
      } else {
        setErrorClassName("");
        displayMessage("Kunde inte få kontakt med databasen, vänligen försök igen.");
      }
    } else if (signupData?.success) {
      // saveUserToLocalStorage(signupData.user);
      saveTokenToLocalStorage(signupData.token);
      clearAllInputfields();
      setErrorClassName("");
      displayMessage(
        "Du har skapat en användare, vi dirigerar dig till startsidan."
      );
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }

  return (
    <FormElement onSubmit={submitHandler}>
      <label htmlFor="userName"><small>*</small> Användarnamn: </label>
      <input
        type="text"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <label htmlFor="password"><small>*</small> Lösenord: </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label htmlFor="firstName"><small>*</small> Förnamn: </label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <label htmlFor="lastName"><small>*</small> Efternamn: </label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <label htmlFor="address"><small>*</small> Adress: </label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <label htmlFor="zipCode"><small>*</small> Postnummer: </label>
      <input
        type="text"
        id="zipCode"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        required
      />
      <label htmlFor="city"><small>*</small> Stad: </label>
      <input
        type="text"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input type="submit" value="Registrera dig" />
      {errorMessage && <p className={errorClassName}>{errorMessage}</p>}
    </FormElement>
  );
}

const FormElement = styled.form`
  display: grid;
  grid-template-columns: 10rem 20rem;

  input[type="text"],
  input[type="password"] {
    height: 40px;
    width: 20rem;
    max-width: 80%;
    margin: 0.5rem;
    background: ${COLORS.lightGreen};
    border: none;
    border-bottom: 2px solid ${COLORS.darkBrown};
    border-radius: 8px;

    &:focus {
    outline: 1px solid ${COLORS.darkBrown};
  }
  }

  input[type="submit"] {
    grid-column: 1 / 3;
    justify-items: center;
    height: 40px;
    width: 16rem;
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 8px;
    color: ${COLORS.darkBrown};
    background: ${COLORS.extraLightBrown};
    border: 2px solid ${COLORS.darkBrown};

    &:hover {
      background: ${COLORS.lightBrown};
      color: ${COLORS.darkBrown};
    }
  }

  p {
    height: 4rem;
    grid-column: 1 / 3;
  }

  p.hidden {
    visibility: hidden;
  }
`;

export default SignupForm;
