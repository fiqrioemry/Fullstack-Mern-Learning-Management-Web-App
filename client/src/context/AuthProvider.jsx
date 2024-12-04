import {
  initialAuthNotification,
  initialSignInFormData,
  initialSignUpFormData,
} from "@/config";
import { signInUser, signUpUser } from "@/services";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [authNotif, setAuthNotif] = useState(initialAuthNotification);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);

  const [userAuth, setUserAuth] = useState({
    authenticate: false,
    user: null,
  });

  const handleSignInUser = async (e) => {
    e.preventDefault();

    const data = await signInUser(signInFormData, setAuthNotif);

    setUserAuth({
      authenticate: true,
      user: data,
    });
  };

  const handleSignUpUser = async (e) => {
    e.preventDefault();

    await signUpUser(signUpFormData, setAuthNotif);
  };

  useEffect(() => {
    if (authNotif.status === "success") {
      alert(authNotif.message);
    } else if (authNotif.status === "failed") {
      alert(authNotif.message);
    }
  }, [authNotif]);

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        authNotif,
        signUpFormData,
        setSignUpFormData,
        signInFormData,
        setSignInFormData,
        handleSignInUser,
        handleSignUpUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
