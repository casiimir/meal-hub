import React, { useState, useEffect } from "react";
import styles from "./fridge.module.scss";

const Fridge = () => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 500);
  }, []);

  return (
    <div className={styles.Fridge}>
      <div className={styles.wrapper}>
        <div
          className={`${styles.circle} ${
            animate ? styles.animate : ""
          } `}></div>{" "}
      </div>
    </div>
  );
};
export default Fridge;
