import React from 'react';
import styled from "styled-components";
import { COLORS } from "../../styles/constants"

function Footer() {
  return <FooterWrapper><p>&#169; Stillsamhetens SPA</p></FooterWrapper>;
}

const FooterWrapper = styled.footer `
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.primary};
  color: ${COLORS.darkBrown};
  
  p {
    padding: 1rem;
  }
`

export default Footer;
