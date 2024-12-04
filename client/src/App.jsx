import HomePage from "./pages/home";
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
      <Route path="/" element={<AuthValidation element={<MainLayout />} />}>
        <Route path="" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
