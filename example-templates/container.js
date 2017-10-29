import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import MainComponent from "./MainComponent";
import stores from "../../stores";

const YourContainer = () => (
  <Provider stores={stores}>
    <MainComponent />
  </Provider>
);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <YourContainer />,
    document.querySelector("selector-to-attach-to")
  );

  // fetch initial data here
});
