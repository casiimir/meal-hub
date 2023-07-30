import React, { useState, useEffect } from "react";
import styles from "./fridge.module.scss";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { LuMenu, LuUser } from "react-icons/lu";

const Fridge = () => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 400);
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
