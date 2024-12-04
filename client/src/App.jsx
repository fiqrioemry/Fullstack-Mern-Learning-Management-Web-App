import HomePage from "./pages/home/index";
import AuthValidation from "@/middleware";
import MainLayout from "./components/layout";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/SignIn";
import SignUpPage from "./pages/auth/SignUp";
import PageNotFound from "./pages/not-found";

function App() {
  return (
    <Routes>
      <Route path="/auth/sign-in" element={<SignInPage />} />
      <Route path="/auth/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<AuthValidation element={<MainLayout />} />}>
        <Route path="" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
