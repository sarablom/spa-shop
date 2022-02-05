import React from 'react';
import AllProducts from '../components/products/AllProducts';
import styled from "styled-components";

function HomePage() {
  return <MainWrapper>
      <h1>Products</h1>
      <AllProducts />
  </MainWrapper>;
}

const MainWrapper = styled.main `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default HomePage;
