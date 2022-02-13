import { useNavigate, useLocation } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../services/localStorageServices";
import styled from "styled-components";
import { COLORS } from "../../styles/constants";
import logo from "../../assets/logo.svg";
import textlogo from "../../assets/textlogo.svg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getTokenFromLocalStorage();

  function logoutHandler() {
    if (location.pathname === "/") {
      window.location.reload();
      localStorage.clear();
    } else {
      navigate("/");
      localStorage.clear();
    }
  }

  return (
    <NavbarWrapper>
      <ImageWrapper>
        <img src={logo} alt="Lotus flower" />
        <img src={textlogo} alt="Stillsamhetens spa" />
      </ImageWrapper>

      <ListWrapper>
        <ListItem onClick={() => navigate("/")}>Hem</ListItem>
        {!token && (
          <ListItem onClick={() => navigate("/login")}>Logga in</ListItem>
        )}
        {!token && (
          <ListItem onClick={() => navigate("/signup")}>
            Registrera dig
          </ListItem>
        )}
        {token && <ListItem onClick={() => logoutHandler()}>Logga ut</ListItem>}
      </ListWrapper>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${COLORS.primary};
  color: ${COLORS.darkBrown};
`;

const ImageWrapper = styled.div`
  display: flex;

  img {
    height: 70px;
    padding: 0.5rem 2rem;
    //filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
    filter: drop-shadow(0px 0.25rem 0.25rem ${COLORS.mediumBrown});
  }
`;

const ListWrapper = styled.ol`
  list-style-type: none;
  display: flex;
  padding-right: 2rem;
`;

const ListItem = styled.li`
  padding: 1rem 2rem;
  text-transform: uppercase;
  font-family: Raleway;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Navbar;
