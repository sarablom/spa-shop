import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function OurServicesPage() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Våra tjänster</h1>

      <ListWrapper>
        <ListItem onClick={() => navigate("/massage")}>Massage</ListItem>
        <ListItem onClick={() => navigate("/rehab")}>Rehab</ListItem>
        <ListItem onClick={() => navigate("/relax")}>Relax</ListItem>
        <ListItem onClick={() => navigate("/treatment")}>Behandlingar</ListItem>
      </ListWrapper>
    </main>
  );
}

const ListWrapper = styled.ol`
  list-style-type: none;
`;

const ListItem = styled.li``;

export default OurServicesPage;
