import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { StudentProvider } from "./context/StudentProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <StudentProvider>
        <App />
      </StudentProvider>
    </AuthProvider>
  </BrowserRouter>
);
