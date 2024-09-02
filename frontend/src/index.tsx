import React from "react";
import ReactDOM from "react-dom/client";
import { ScenariosProvider } from "./context/ScenarioContext";
import "./index.css";
import MainPage from "./pages/MainPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <div className="App">
      <ScenariosProvider>
        <MainPage />
      </ScenariosProvider>
    </div>
  </React.StrictMode>,
);
