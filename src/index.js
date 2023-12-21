import React from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.css';
import "./assets/css/style.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";
const root = createRoot(document.getElementById("root"));
root.render(<Provider store={store}><App /></Provider>);
