import { Fragment } from "react";
import { useAuth } from "@/context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function AuthValidation({ element }) {
  const location = useLocation();
  const token = sessionStorage.getItem("accessToken");
  const { authUser } = useAuth();

  if (!token && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  if (
    token &&
    authUser.user?.role !== "instructor" &&
    (location.pathname.includes("instructor") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
  }

  if (
    token &&
    authUser.user.role === "instructor" &&
    !location.pathname.includes("instructor")
  ) {
    return <Navigate to="/instructor" />;
  }
  return <Fragment>{element}</Fragment>;
}
export default AuthValidation;
