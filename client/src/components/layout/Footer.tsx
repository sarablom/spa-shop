import React from 'react';
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import { COLORS } from "../../styles/constants";

function Footer() {
  return <FooterWrapper><img src={logo} alt="Stillsamhetens spa" />&#169; Stillsamhetens Spa, 2022</FooterWrapper>;
}

const FooterWrapper = styled.footer `
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.primary};
  color: ${COLORS.darkBrown};
  flex-shrink: 0;
  height: 5.5rem;
  
  img {
    height: 3rem;
    padding: .5rem;
    filter: drop-shadow(0px 0.25rem 0.25rem ${COLORS.mediumBrown});
  }
`

export default Footer;
