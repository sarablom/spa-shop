import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import massage from "../assets/massage.jpg";
import massageStenar from "../assets/massage-stenar.jpg";
import rehab from "../assets/lugn.jpg";
import bokskog from "../assets/bokskog.jpg";

function OurServicesPage() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Våra tjänster</h1>

      <ListWrapper>
        <ListItem onClick={() => navigate("/massage")}>
          <ListItemFlexWrapper>
            <h3>Massage</h3>
            <p>
              Cat ipsum dolor sit amet, weigh eight pounds but take up a
              full-size bed. Cat ass trophy. Eat all the power cords meoooow
              swipe at owner's legs so cats are fats i like to pets them they
              like to meow back and where is it? i saw that bird i need to bring
              it home to mommy squirrel! crash against wall but walk away like
              nothing happened <span>Läs mer</span>
            </p>
          </ListItemFlexWrapper>
          <img src={massage} alt="Woman getting a massage" />
        </ListItem>
        <ListItem onClick={() => navigate("/rehab")}>
          <ListItemFlexWrapper>
            <h3>Rehab</h3>
            <p>
              Cat ipsum dolor sit amet, weigh eight pounds but take up a
              full-size bed. Cat ass trophy. Eat all the power cords meoooow
              swipe at owner's legs so cats are fats i like to pets them they
              like to meow back and where is it? i saw that bird i need to bring
              it home to mommy squirrel! crash against wall but walk away like
              nothing happened <span>Läs mer</span>
            </p>
          </ListItemFlexWrapper>
          <img src={rehab} alt="Woman getting a massage" />
        </ListItem>
        <ListItem onClick={() => navigate("/relax")}>
          <ListItemFlexWrapper>
            <h3>Relax</h3>
            <p>
              Cat ipsum dolor sit amet, weigh eight pounds but take up a
              full-size bed. Cat ass trophy. Eat all the power cords meoooow
              swipe at owner's legs so cats are fats i like to pets them they
              like to meow back and where is it? i saw that bird i need to bring
              it home to mommy squirrel! crash against wall but walk away like
              nothing happened <span>Läs mer</span>
            </p>
          </ListItemFlexWrapper>
          <img src={bokskog} alt="Woman getting a massage" />
        </ListItem>
        <ListItem onClick={() => navigate("/treatment")}>
          <ListItemFlexWrapper>
            <h3>Behandlingar</h3>
            <p>
              Cat ipsum dolor sit amet, weigh eight pounds but take up a
              full-size bed. Cat ass trophy. Eat all the power cords meoooow
              swipe at owner's legs so cats are fats i like to pets them they
              like to meow back and where is it? i saw that bird i need to bring
              it home to mommy squirrel! crash against wall but walk away like
              nothing happened <span>Läs mer</span>
            </p>
          </ListItemFlexWrapper>
          <img src={massageStenar} alt="Woman getting a massage" />
        </ListItem>
      </ListWrapper>
    </main>
  );
}

const ListWrapper = styled.ol`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 4rem;

  @media (max-width: 600px) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

  img {
    height: 10rem;
    margin-left: 2rem;
    border-radius: 1rem;
    opacity: 0.8;
  }


`;

const ListItemFlexWrapper = styled.div`
  p {
    span {
      text-align: justify;
      text-transform: uppercase;
      font-weight: 700;
    }
  }
`;

export default OurServicesPage;
