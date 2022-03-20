import { useNavigate } from "react-router-dom";
import LoginForm from "../components/users/LoginForm";
import styled from "styled-components";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <MainWrapper>
      <h1>Logga in</h1>
      <LoginForm />
      <p>
        Är du inte redan en kund hos oss?{" "}
        <span onClick={() => navigate("/signup")}>Registrera dig här</span>
      </p>
    </MainWrapper>
  );
}

const MainWrapper = styled.main`

p {
  margin: 1rem;
}

span {
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default LoginPage;
