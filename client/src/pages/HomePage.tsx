import AllProducts from '../components/products/AllProducts';
import styled from "styled-components";

function HomePage() {
  return <MainWrapper>
      <h1>Products</h1>
      <AllProducts />
  </MainWrapper>;
}

const MainWrapper = styled.main `
  
`

export default HomePage;
