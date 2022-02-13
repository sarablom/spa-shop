import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authServices";
import { saveUserToLocalStorage, saveTokenToLocalStorage } from "../../services/localStorageServices";
import styled from "styled-components";
import { COLORS } from "../../styles/constants";

function SignupForm() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [errorClassName, setErrorClassName] = useState<string>("hidden");

  const [errorMessage, setErrorMessage] = useState<string>("Errormeddelande");
  const navigate = useNavigate();

  function displayMessage(error: string) {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorClassName("hidden");
        setErrorMessage("Errormeddelande")
    }, 5000);
  }

  function clearAllInputfields () {
      setUserName("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setAddress("");
  }

  async function submitHandler (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if(!userName || !password || !firstName || !lastName || !address) {
        setErrorClassName("");
        displayMessage("Du måste fylla i alla fält för att kunna registrera dig.");
        return;
    }

    const signupData = await signup(userName, password, firstName, lastName, address);

    if (signupData.error) {
        displayMessage(signupData.error)
    } else if (signupData.success) {
        saveUserToLocalStorage(signupData.user);
        saveTokenToLocalStorage(signupData.token);
        clearAllInputfields();
        displayMessage("Du har skapat en användare, vi dirigerar dig till startsidan.");
        setTimeout(() => {
           navigate("/");
        }, 2000);
    }
  }

  return (
    <FormElement onSubmit={submitHandler}>
    <label htmlFor="userName">Användarnamn: </label>
      <input
        type="text"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label htmlFor="password">Lösenord: </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="firstName">Förnamn: </label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
       <label htmlFor="lastName">Efternamn: </label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
       <label htmlFor="address">Adress: </label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
       <input type="submit" value="Registrera dig" />
        {errorMessage && <p className={errorClassName}>{errorMessage}</p>}
    </FormElement>
  );
}

const FormElement = styled.form `
    display: flex;
    flex-direction: column;

    input[type="text"],
  input[type="password"] {
    height: 40px;
    width: 20rem;
    max-width: 80%;
    margin: .5rem;
    border: 2px solid ${COLORS.darkBrown};
    box-shadow: 0px 0.25rem 0.25rem ${COLORS.mediumBrown};
    border-radius: 8px;
  }

  input[type="submit"] {
    height: 40px;
    width: 16rem;
    margin: .5rem;
    padding: .5rem 1rem;
    cursor: pointer;
  }

  p {
    height: 2rem;
  }

  p.hidden {
    visibility: hidden;
  }
`

export default SignupForm;
