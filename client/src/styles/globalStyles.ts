import { createGlobalStyle } from "styled-components";
import { COLORS } from "./constants";

export const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html, body {
  height: 100%;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  color: ${COLORS.darkBrown};
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

button {
  color: ${COLORS.darkGreen};
  background: ${COLORS.lightGreen};
  border: 2px solid ${COLORS.primary};
  cursor: pointer;
}

button:hover {
  background: ${COLORS.primary};
  color: ${COLORS.darkGreen};
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root, #__next {
  isolation: isolate;
}
body {
    font-family: 'Bitter', serif;
    background: ${COLORS.lightGreen};
    display: flex;
    flex-direction: column;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;
}

h1 {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  padding: 1rem;
}

h2, h3, h4, h5 {
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
}
`;
