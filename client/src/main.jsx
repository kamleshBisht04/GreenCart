import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowerRouter } from "react-router-dom";
import { AppContextProvider } from "./context/Appcontext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowerRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowerRouter>
  </StrictMode>,
);
