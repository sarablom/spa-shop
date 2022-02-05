import React from "react";
import styled from "styled-components";
import { COLORS } from "../../styles/constants";
import logo from "../../assets/logo.svg";

function Navbar() {
  return (
    <NavbarWrapper>
      <ListWrapper>
        <ListItem>Home</ListItem>
          <img src={logo} alt="Lotus flower" />
        <ListItem>Cart</ListItem>
      </ListWrapper>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.primary};
  color: ${COLORS.darkBrown};
`;

const ListWrapper = styled.ol`
  list-style-type: none;
  display: flex;

  img {
    width: 100px;
  }
`;

const ListItem = styled.li`
  padding: 1rem 2rem;
  text-transform: uppercase;
  font-family: Raleway;
  font-weight: 500;
`;

export default Navbar;
