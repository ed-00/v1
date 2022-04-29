import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootDiv = document.getElementById("root");
const Root = createRoot(rootDiv);
Root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
