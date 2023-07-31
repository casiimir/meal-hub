import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { useRouter } from "next/router";

const Navbar = ({ leftButton, pageTitle = "Default page", rightButton }) => {
  // VARIABLES ----------------
  const router = useRouter();
  const navBarHeight = 80; // è da cambiare in base al valore in "styles - variables.scss"
  // CONDITIONS ---------------
  const [showPageTitle, setShowPageTitle] = useState(false);
  const handleGoBack = () => {
    router.push("/");
  };
  // FUNCTIONS ----------------
  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY > navBarHeight
        ? setShowPageTitle(true)
        : setShowPageTitle(false);
    });
  }, []);
  // RETURN -------------------
  return (
    <>
      <div className={styles.Navbar}>
        <div onClick={() => handleGoBack()} className={styles.sx}>
          {leftButton}
        </div>
        <div className={styles.pageTitle}>
          {showPageTitle ? pageTitle : null}
        </div>
        <div className={styles.dx}>{rightButton}</div>
      </div>
    </>
  );
};

export default Navbar;
