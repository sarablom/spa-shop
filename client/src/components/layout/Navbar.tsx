import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../services/localStorageServices";
import { Menu, LogIn, LogOut } from "react-feather";
import styled from "styled-components";
import { COLORS } from "../../styles/constants";
import logo from "../../assets/logo.svg";
import textlogo from "../../assets/textlogo.svg";

function Navbar() {
  const [showHamburger, setShowHamburger] = useState(false);
  const [hamburgerClass, setHamburgerClass] = useState("hideHamburgerMenu");
  const [showMenu, setShowMenu] = useState(false);
  const [expandHamburgerMenu, setExpandHamburgerMenu] = useState(false);
  const [loginBtnClass, setLoginBtnClass] = useState("1.5rem");
  const smallDevice = 900;
  const navigate = useNavigate();
  const location = useLocation();
  const token = getTokenFromLocalStorage();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const deviceSize = window.innerWidth;
        if (deviceSize <= smallDevice) {
          setShowHamburger(true);
          setLoginBtnClass("4.5rem");
        }
      },
      false
    );
  }, []);

  function logoutHandler() {
    if (location.pathname === "/") {
      window.location.reload();
      localStorage.clear();
      setExpandHamburgerMenu(false);
    } else {
      navigate("/");
      localStorage.clear();
      setExpandHamburgerMenu(false);
    }
  }

  function showHamburgerMenuHander() {
    setShowMenu(!showMenu);
    setHamburgerClass("showHamburgerMenu");
    setExpandHamburgerMenu(!expandHamburgerMenu);
  }

  return (
    <NavbarWrapper>
      <ImageWrapper>
        <img src={logo} alt="Lotus flower" />
        <img src={textlogo} alt="Stillsamhetens spa" />
      </ImageWrapper>

      {showHamburger && (
        <Menu
          style={{ cursor: "pointer", position: "absolute", right: "1.5rem" }}
          size={34}
          onClick={() => showHamburgerMenuHander()}
        />
      )}
      {!token && (
        <LogIn
          style={{
            cursor: "pointer",
            position: "absolute",
            right: loginBtnClass,
          }}
          size={34}
          onClick={() => navigate("/login")}
        />
      )}
      {token && (
        <LogOut
          style={{
            cursor: "pointer",
            position: "absolute",
            right: loginBtnClass,
          }}
          size={34}
          onClick={() => logoutHandler()}
        />
      )}

      {!showHamburger && (
        <ListWrapper className={hamburgerClass}>
          <ListItem onClick={() => navigate("/")}>Hem</ListItem>
          <ListItem onClick={() => navigate("/shop")}>Shop</ListItem>
          <ListItem onClick={() => navigate("/about")}>Om oss</ListItem>
          <ListItem onClick={() => navigate("/services")}>Våra tjänster</ListItem>
        </ListWrapper>
      )}
      {expandHamburgerMenu && (
        <HamburgerWrapper>
          <ListItem
            onClick={() => {
              navigate("/");
              setExpandHamburgerMenu(false);
            }}
          >
            Hem
          </ListItem>
          <ListItem onClick={() => navigate("/shop")}>Shop</ListItem>
          <ListItem onClick={() => navigate("/about")}>Om oss</ListItem>
          <ListItem onClick={() => navigate("/services")}>Våra tjänster</ListItem>
          {/* {!token && (
            <ListItem
              onClick={() => {
                navigate("/signup");
                setExpandHamburgerMenu(false);
              }}
            >
              Registrera dig
            </ListItem>
          )} */}
        </HamburgerWrapper>
      )}
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
  max-width: 50vw;

  img {
    height: 5rem;
    padding: 0.5rem 1rem;
    filter: drop-shadow(0px 0.25rem 0.25rem ${COLORS.mediumBrown});
  }
`;

const ListWrapper = styled.ol`
  list-style-type: none;
  display: flex;
  padding-right: 3rem;
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

const HamburgerWrapper = styled.ol`
  position: absolute;
  right: 0;
  top: 70px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
  list-style-type: none;
  background: ${COLORS.primary};
`;

export default Navbar;
