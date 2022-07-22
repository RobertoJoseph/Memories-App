import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import reducers from "./reducers/index";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({ reducer: reducers });

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById("root")
);
