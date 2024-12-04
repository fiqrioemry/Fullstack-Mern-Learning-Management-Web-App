import AuthValidation from "middleware";
import AuthPage from "./pages/auth";
import HomePage from "./pages/home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<AuthValidation />}>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
