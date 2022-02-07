import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authServices";
import { saveUserToLocalStorage, saveTokenToLocalStorage } from "../../services/localStorageServices";
import styled from "styled-components";

function SignupForm() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  function displayMessage(error: string) {
    setErrorMessage(error);
    setTimeout(() => {
        setErrorMessage("")
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
        displayMessage("Du måste fylla i alla fält för att kunna registrera dig.");
        return;
    }

    const signupData = await signup(userName, password, firstName, lastName, address);
    console.log(signupData);

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
        {errorMessage && <p>{errorMessage}</p>}
    </FormElement>
  );
}

const FormElement = styled.form `
    display: flex;
    flex-direction: column;
`

export default SignupForm;
