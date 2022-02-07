import React from "react";
import styled from "styled-components";
import { COLORS } from "../../styles/constants";
import logo from "../../assets/logo.svg";

function Navbar() {
  return (
    <NavbarWrapper>
            <img src={logo} alt="Lotus flower" />
      <ListWrapper>
        <ListItem>Hem</ListItem>
        <ListItem>Kundkorg</ListItem>
        <ListItem>Logga in</ListItem>
        <ListItem>Registrera dig</ListItem>
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

  img {
    width: 150px;
    padding: .5rem 2rem;
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
