import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { MioraProvider } from "./context/MioraContext";
import App from "./App";
import "./styles/tokens.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MioraProvider>
          <App />
        </MioraProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
