import React from "react"
import ReactDOM from "react-dom/client"
import "./assets/css/style.css"
import store from "./redux/store" // Import your Redux store
import { Provider } from "react-redux" // Import Provider from react-redux

import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
