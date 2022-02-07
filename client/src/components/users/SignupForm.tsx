import { useRef, useState } from "react";
import { signup } from "../../services/authServices";
import styled from "styled-components";

function SignupForm() {
  const userNameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const addressInput = useRef<HTMLInputElement>(null);
  const buttonElement = useRef<HTMLInputElement>(null);

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  function displayErrorMessage(error: string) {
    setErrorMessage(error)
  }

  async function submitHandler (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if(!userName || !password || !firstName || !lastName || !address) {
        displayErrorMessage("Du måste fylla i alla fält för att kunna registrera dig.")
    }

    const signupData = await signup(userName, password, firstName, lastName, address);
    console.log(signupData);
    
  }

  return (
    <FormElement onSubmit={submitHandler}>
    <label htmlFor="userName">Användarnamn: </label>
      <input
        type="text"
        id="userName"
        ref={userNameInput}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label htmlFor="password">Lösenord: </label>
      <input
        type="password"
        id="password"
        ref={passwordInput}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="firstName">Förnamn: </label>
      <input
        type="text"
        id="firstName"
        ref={firstNameInput}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
       <label htmlFor="lastName">Efternamn: </label>
      <input
        type="text"
        id="lastName"
        ref={lastNameInput}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
       <label htmlFor="address">Adress: </label>
      <input
        type="text"
        id="address"
        ref={addressInput}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
       <input type="submit" value="Sign up" ref={buttonElement} />
        {errorMessage && <p>{errorMessage}</p>}
    </FormElement>
  );
}

const FormElement = styled.form `
    display: flex;
    flex-direction: column;
`

export default SignupForm;
