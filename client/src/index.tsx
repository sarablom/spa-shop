import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyle } from "./styles/globalStyles";
import { Provider } from "react-redux";
import store from "../src/store/index";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
