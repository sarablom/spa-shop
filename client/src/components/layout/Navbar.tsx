import React from "react";
import styled from "styled-components";

function Navbar() {
  return (
    <NavbarWrapper>
      <ListWrapper>
        <ListItem>Home</ListItem>
        <ListItem>Cart</ListItem>
      </ListWrapper>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav `
  display: flex;
  align-items: center;
  justify-content: center;
`

const ListWrapper = styled.ol `
  list-style-type: none;
  display: flex;
`

const ListItem = styled.li `
  padding: 1rem 2rem;
`

export default Navbar;
