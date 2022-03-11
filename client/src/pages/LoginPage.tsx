import { useNavigate } from "react-router-dom";
import LoginForm from "../components/users/LoginForm";
import styled from "styled-components";

function LoginPage() {
  const navigate = useNavigate();
 
  return (
    <main>
      <h1>Logga in</h1>
      <LoginForm />
      <p>
        Är du inte redan en kund hos oss?{" "}
        <Link onClick={() => navigate("/signup")}>Registrera dig här</Link>
      </p>
    </main>
  );
}

const Link = styled.span `
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export default LoginPage;
