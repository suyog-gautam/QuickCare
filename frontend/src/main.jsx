import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <AppProvider>
      {" "}
      <App />
    </AppProvider>
  </BrowserRouter>
);
