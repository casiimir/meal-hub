import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export const AuthContext = React.createContext({ loggedIn: false });

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthInit = () => {
  const [authInit, setAuthInit] = useState({
    loading: true,
    auth: { loggedIn: true, userId: "" },
  });
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      const auth = user
        ? { loggedIn: true, userId: user.uid }
        : { loggedIn: false, userId: undefined };
      setAuthInit({ loading: false, auth });
    });
  }, []);

  return authInit;
};
