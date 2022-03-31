import backgroundPic from "../assets/gult-hus2.jpg";
import styled from "styled-components";

function AboutPage() {
  return (
    <AboutMain>
     
        <h1>Om oss</h1>
        <p>
          Cat ipsum dolor sit amet, weigh eight pounds but take up a full-size
          bed. Cat ass trophy. Eat all the power cords meoooow swipe at owner's
          legs so cats are fats i like to pets them they like to meow back and
          where is it? i saw that bird i need to bring it home to mommy
          squirrel! crash against wall but walk away like nothing happened. Bite
          the neighbor's bratty kid. Inspect anything brought into the house
          tuxedo cats always looking dapper furrier and even more furrier
          hairball or bury the poop bury it deep sleeping in the box yet stare
          at imaginary bug tickle my belly at your own peril i will pester for
          food when you're in the kitchen even if it's salad . Love and coo
          around boyfriend who purrs and makes the perfect moonlight eyes so i
          can purr and swat the glittery gleaming yarn to him (the yarn is from
          a $125 sweater) murf pratt ungow ungow.
        </p>
    </AboutMain>
  );
}

const AboutMain = styled.main`
  display: flex;
  width: 100vw;
  background-image: linear-gradient(
      rgba(153, 204, 153, 0.9),
      rgba(153, 204, 153, 0.7)
    ),
    url(${backgroundPic});
  background-size: cover;

  p {
    width: 700px;
    max-width: 80%;
    padding: 2rem 0 4rem;
    text-align: justify;
  }
`;

export default AboutPage;
