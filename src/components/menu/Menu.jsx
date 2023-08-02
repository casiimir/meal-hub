import { Routes } from "@/utils/routes";
import styles from "./Menu.module.scss";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { LuLogIn, LuLogOut, LuX } from "react-icons/lu";
import Button from "../Button";
import { useAuthContext } from "@/context/AuthContext";
import { localStorageManager } from "@/utils/localStorage";

const Menu = ({ isMenuOpen, setMenuOpen }) => {
  // VARIABLES ----------------
  const router = useRouter();
  const auth = getAuth();
  const { user } = useAuthContext();

  // CONDITIONS ---------------
  const [classMenu, setClassMenu] = useState("isClosed"); //"isOpen" | "isClosed"
  const [currentLocation, setCurrentLocation] = useState("");
  const [userLogged, setUserLogged] = useState(null);
  // FUNCTIONS ----------------
  useEffect(() => {
    // console.log(user);
    if (user) {
      const auxData = localStorageManager.getData("user");
      setUserLogged(auxData);
    } else {
      setUserLogged(null);
    }
  }, [user]);

  useEffect(() => {
    if (isMenuOpen) {
      setClassMenu("isOpen");
      document.body.style.overflow = "hidden";
    } else {
      setClassMenu("isClosed");
      document.body.style.overflow = "scroll";
    }
    setCurrentLocation(router.asPath);
  }, [isMenuOpen]);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    router.push(path);
  };
  // RETURN -------------------
  return (
    <div
      className={`
    ${styles.SlideMenu}
    ${styles[classMenu]}
    `}
    >
      <div className={`${styles.header}`}>
        <Button
          icon={(size) => <LuX size={size} />}
          onClick={() => setMenuOpen(false)}
        />
      </div>

      <div className={`${styles.content}`}>
        {Routes.map((route, index) => {
          if (!route.hideSideMenu)
            return (
              <div
                onClick={() => handleNavigate(route.path)}
                key={index + "sideMenuRoutes"}
                className={`${styles.contentBtn}`}
              >
                {route.icons
                  ? currentLocation !== route.path
                    ? route.icons[0]
                    : route.icons[1]
                  : null}
                <p
                  className={
                    currentLocation !== route.path
                      ? `${styles.contentBtn__text}`
                      : `${styles.contentBtn__text__active}`
                  }
                >
                  {route.name}
                </p>
              </div>
            );
        })}

        {userLogged ? (
          <Button
            type="outline"
            color="danger"
            direction="right"
            icon={(size) => <LuLogOut size={size} />}
            onClick={() => {
              signOut(auth).then(() => setMenuOpen(false));
            }}
            text={"Log out from " + userLogged?.name}
          />
        ) : isMenuOpen ? (
          <Button
            type="fill"
            color="primary"
            direction="right"
            icon={(size) => <LuLogIn size={size} />}
            onClick={() => {
              router.push("/login");
              setMenuOpen(false);
            }}
            text={"Login to unlock all features"}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
