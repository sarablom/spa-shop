import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authServices";
import {
  saveUserToLocalStorage,
  saveTokenToLocalStorage,
} from "../../services/localStorageServices";
import styled from "styled-components";
import { COLORS } from "../../styles/constants";

function LoginForm() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  function displayMessage(message: string) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }

  function clearAllInputfields() {
    setUserName("");
    setPassword("");
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!userName || !password) {
      displayMessage("Fyll i användarnamn och lösenord");
      return;
    }

    const loginData = await login(userName, password);

    if (loginData.error) {
      displayMessage(loginData.error);
      clearAllInputfields();
    } else if (loginData.success) {
      saveUserToLocalStorage(loginData.user);
      saveTokenToLocalStorage(loginData.token);
      clearAllInputfields();
      navigate("/");
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

      <input type="submit" value="Logga in" />
      {errorMessage && <p>{errorMessage}</p>}
    </FormElement>
  );
}

const FormElement = styled.form`
  display: flex;
  flex-direction: column;

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
  }

  input[type="submit"] {
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
`;

export default LoginForm;
