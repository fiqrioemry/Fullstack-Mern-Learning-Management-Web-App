import { InitialSignInFormData } from "@/config";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [signInFormData, setSignInFormData] = useState(InitialSignInFormData);

  return (
    <AuthContext.Provider value={{ signInFormData, setSignInFormData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
