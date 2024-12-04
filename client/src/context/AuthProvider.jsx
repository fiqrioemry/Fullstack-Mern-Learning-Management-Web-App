import { InitialSignInFormData } from "@/config";
import { loginService } from "@/services";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [signInFormData, setSignInFormData] = useState(InitialSignInFormData);
  const [userAuth, setUserAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState(null);

  const handleLoginUser = async (e) => {
    e.preventDefault();

    const data = await loginService(
      signInFormData,
      setAuthLoading,
      setAuthMessage
    );

    setUserAuth({
      authenticate: true,
      user: data,
    });
  };

  useEffect(() => {
    if (authMessage) {
      alert(authMessage);
    }
  }, [authMessage]);

  console.log(authMessage);
  return (
    <AuthContext.Provider
      value={{
        userAuth,
        signInFormData,
        setSignInFormData,
        handleLoginUser,
        authLoading,
        authMessage,
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
