import backgroundPic from "../assets/solnedgang-trad.jpg";
import styled from "styled-components";

function HomePage() {
  return (
    <StartMain>
      <SideTitle>Välkommen till Stillsamhetens Spa</SideTitle>
    </StartMain>
  );
}

const StartMain = styled.main`
  background-image: linear-gradient(
      rgba(153, 204, 153, 0.9),
      rgba(153, 204, 153, 0.7)
    ),
    url(${backgroundPic});
  background-size: cover;
`;

const SideTitle = styled.h1`
  padding: 4rem 1rem;
`;

export default HomePage;
