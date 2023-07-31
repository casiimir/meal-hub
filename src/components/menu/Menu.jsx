import { Routes } from "@/pages/routes";
import styles from "./Menu.module.scss";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";
import Button from "../Button";

const Menu = ({ isMenuOpen, setMenuOpen }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // const auth = getAuth();
  // const { user } = useAuthContext();

  // CONDITIONS ---------------
  const [classMenu, setClassMenu] = useState("isClosed"); //"isOpen" | "isClosed"
  const [currentLocation, setCurrentLocation] = useState("");
  const [logged, setLogged] = useState(false);
  // FUNCTIONS ----------------

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

        {logged ? (
          <div
            // onClick={() => { signOut(auth).then(() => setMenuOpen(false)) }}
            className={`${styles.contentBtn}`}
          >
            <p className={`${styles.contentBtn__text}`}>Log out</p>
          </div>
        ) : (
          <div className={`${styles.contentBtn}`}>
            <p className={`${styles.contentBtn__text}`}>Utente non loggato</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
