import HomePage from "./pages/home/index";
import AuthValidation from "@/middleware";
import MainLayout from "./components/layout";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/SignIn";
import SignUpPage from "./pages/auth/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/auth/sign-in" element={<SignInPage />} />
      <Route path="/auth/sign-up" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
