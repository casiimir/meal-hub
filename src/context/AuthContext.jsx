import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "@/firebase/config";
import Toast from "@/components/Toast";
import { useRouter } from "next/navigation";
import { LuLogIn } from "react-icons/lu";
import Button from "@/components/Button";

const auth = getAuth(app);

export const AuthContext = React.createContext({ user: null });

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [notification, setNotification] = React.useState(false);
  // FUNCTIONS ----------------
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGoToLogin = () => {
    setNotification(true);
    router.push("/login");
  };
  // RETURN -------------------
  return (
    <AuthContext.Provider value={{ user }}>
      {!user ? (
        !notification ? (
          <Toast
            isOpen={loading}
            setIsClosed={setNotification}
            text="Welcome! Login to unlock full functionalities!"
            button={
              <Button
                text="Login"
                icon={(size) => <LuLogIn size={size} />}
                direction="right"
                color="secondary"
                onClick={() => handleGoToLogin()}
              />
            }
          />
        ) : null
      ) : null}
      {children}
    </AuthContext.Provider>
  );
};
