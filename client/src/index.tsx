import React from "react";
import ReactDOM from "react-dom";
import Shell from "./pages/AppShell";
import "./style.css";
const { unstable_createRoot: createRoot } = ReactDOM as any;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Shell />
  </React.StrictMode>
);
