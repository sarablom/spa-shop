import backgroundPic from "../assets/solnedgang-trad.jpg";
import styled from "styled-components";

function HomePage() {
  return (
    <StartMain>
      <h1>Välkommen till Stillsamhetens Spa</h1>
      <p>
        Scratch the walls carrying out surveillance on the
        neighbour's dog hide at bottom of staircase to trip human a nice warm
        laptop for me to sit on. Catch small lizards, bring them into house,
        then unable to find them on carpet sniff sniff but purr for no reason so
        thinking longingly about tuna brine and milk the cow but get away from
        me stupid dog. Car rides are evil this cat happen now, it was too
        purr-fect!!! Gate keepers of hell so jump on fridge do not try to mix
        old food with new one to fool me!. Avoid the new toy and just play with
        the box it came in eat a rug and furry furry hairs everywhere oh no
        human coming lie on counter don't get off counter and cat snacks, and
        floof tum, tickle bum, jellybean footies curly toes, but murr i hate
        humans they are so annoying. Fall asleep upside-down lick plastic bags
        meowing non stop for food cat ass trophy so eat half my food and ask for
        more cat gets stuck in tree firefighters try to get cat down
        firefighters get stuck in tree cat eats firefighters' slippers at four
        in the morning wake up owner meeeeeeooww scratch at legs.
      </p>
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

  p {
    width: 700px;
    max-width: 80%;
    padding: 2rem 0 4rem;
    text-align: justify;
  }
`;

export default HomePage;
