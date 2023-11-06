import React from "react"
import ReactDOM from "react-dom/client"
import 'bootstrap/dist/css/bootstrap.css';
import "./assets/css/style.css"
import store from "./redux/store" // Import your Redux store
import { Provider } from "react-redux" // Import Provider from react-redux
import App from "./App"
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1043028769339-dsc7uh2eo9ghanvbvaosro5auqmkam3r.apps.googleusercontent.com" clientSecret="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">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
