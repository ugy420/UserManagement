import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router } from "react-router-dom";
import { TokenProvider } from "./components/TokenContext";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="906534936927-7nm3rq2arhr02t215ompmbvtu14jo0f4.apps.googleusercontent.com">
    <StrictMode>
      <TokenProvider>
        <Router>
          <App />
        </Router>
      </TokenProvider>
    </StrictMode>
  </GoogleOAuthProvider>
);
