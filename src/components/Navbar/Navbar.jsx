import { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';

const Navbar = (
  {
    leftButton,
    pageTitle = "Default page",
    rightButton,
  }
) => {
  // VARIABLES ----------------
  const navBarHeight = 80; // è da cambiare in base al valore in "styles - variables.scss"
  // CONDITIONS ---------------
  const [showPageTitle, setShowPageTitle] = useState(false);
  // FUNCTIONS ----------------
  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY > navBarHeight ?
        setShowPageTitle(true)
        :
        setShowPageTitle(false);
    })
  }, [])
  // RETURN -------------------
  return (
    <div className={styles.Navbar}>
      <div className={styles.sx}>
        {leftButton}
      </div>
      <div className={styles.pageTitle}>
        {
          showPageTitle ? pageTitle : null
        }

      </div>
      <div className={styles.dx}>
        {rightButton}
      </div>
    </div>
  );
}

export default Navbar;