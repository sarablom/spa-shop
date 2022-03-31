import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../services/localStorageServices";
// import { getWindowDimensions } from "../../utils/helperFunctions";
import { DeviceSize } from "../../models/DeviceSize";
import { Menu, User, UserX } from "react-feather";
import styled from "styled-components";
import { COLORS } from "../../styles/constants";
import logo from "../../assets/logo.svg";
import textlogo from "../../assets/textlogo.png";

function Navbar() {
  const [showHamburger, setShowHamburger] = useState(false);
  const [hamburgerClass, setHamburgerClass] = useState("hideHamburgerMenu");
  const [showMenu, setShowMenu] = useState(false);
  const [expandHamburgerMenu, setExpandHamburgerMenu] = useState(false);
  const [loginBtnClass, setLoginBtnClass] = useState("1.5rem");
  const [addClassOverlayElement, setAddClassOverlayElem] =
    useState<string>("hide");
    const [windowDimensions, setWindowDimensions] = useState<DeviceSize | null>(null);
  const smallDevice = 1100;
  const navigate = useNavigate();
  const location = useLocation();
  const token = getTokenFromLocalStorage();

  useEffect(() => {
    setWindowDimensions({width: window.innerWidth, height: window.innerHeight}); 
  }, []);

  const getWindowDimensions = useCallback(() => {
    if (windowDimensions) {
      if (windowDimensions.width <= smallDevice) {
        setShowHamburger(true);
        setLoginBtnClass("4.5rem");
      }
    }
  }, [windowDimensions]);

  useEffect(() => {
    getWindowDimensions(); 
  }, [getWindowDimensions]);

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
    setAddClassOverlayElem("hide" ? "show" : "hide");
  }

  return (
    <NavbarWrapper>
      <ImageWrapper>
        <img src={logo} alt="Lotus flower" onClick={() => navigate("/")} />
        <img
          src={textlogo}
          alt="Stillsamhetens spa"
          onClick={() => navigate("/")}
        />
      </ImageWrapper>

      {showHamburger && (
        <Menu
          style={{ cursor: "pointer", position: "absolute", right: "1.5rem" }}
          size={34}
          onClick={() => showHamburgerMenuHander()}
        />
      )}
      {!token && (
        <User
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
        <UserX
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
          <ListItem onClick={() => navigate("/services")}>
            Våra tjänster
          </ListItem>
        </ListWrapper>
      )}
      {expandHamburgerMenu && (
        <>
          <Overlay
            className={addClassOverlayElement}
            onClick={() => showHamburgerMenuHander()}
          ></Overlay>
          <HamburgerWrapper onClick={(e) => e.stopPropagation()}>
            <ListItem
              onClick={() => {
                navigate("/");
                setExpandHamburgerMenu(false);
              }}
            >
              Hem
            </ListItem>
            <ListItem
              onClick={() => {
                setExpandHamburgerMenu(false);
                navigate("/shop");
              }}
            >
              Shop
            </ListItem>
            <ListItem
              onClick={() => {
                setExpandHamburgerMenu(false);
                navigate("/about");
              }}
            >
              Om oss
            </ListItem>
            <ListItem
              onClick={() => {
                setExpandHamburgerMenu(false);
                navigate("/services");
              }}
            >
              Våra tjänster
            </ListItem>
          </HamburgerWrapper>
        </>
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
    /* filter: drop-shadow(0px 0.25rem 0.25rem ${COLORS.mediumBrown}); */
    cursor: pointer;
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
  padding: 0 2rem 2rem 2rem;
  list-style-type: none;
  background: ${COLORS.primary};

  li:hover {
    color: ${COLORS.primary};
    background-color: ${COLORS.lightGreen};
    text-decoration: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;

  .show {
    display: block;
  }
`;

export default Navbar;
