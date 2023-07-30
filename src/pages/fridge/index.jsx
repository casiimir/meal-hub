import React, { useState, useEffect } from "react";
import styles from "./fridge.module.scss";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { LuMenu, LuUser } from "react-icons/lu";


const Fridge = () => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  const [pageTitle, setPageTitle] = useState("Fridge");
  const [pageSubtitle, setPageSubtitle] = useState("Sottotitolo pagina");
  // FUNCTIONS ----------------
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setAnimate(true);
      }, 400);
    }, []);
    // RETURN -------------------
    return (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.HomePage}>
          <main>
            {/* ------------ NAVBAR ------------ */}
            <Navbar
              leftButton={
                <Button
                  icon={() => <LuMenu size={24} />}
                  type="text"
                  color="dark"
                />
              }
              pageTitle={pageTitle}
              rightButton={
                <Button
                  icon={() => <LuUser size={24} />}
                  type="text"
                  color="dark"
                />
              }
            />
            {/* ----------- HEADER ------------- */}
            <div className="page-header">
              <h1>{pageTitle}</h1>
              <p>{pageSubtitle}</p>
            </div>
            {/* ------ INIZIO CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
            <div className={styles.Fridge}>
              <div className={styles.wrapper}>
                <div
                  className={`${styles.circle} ${
                    animate ? styles.animate : ""
                  } `}
                ></div>{" "}
              </div>
            </div>
            {/* ------ FINE CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
          </main>
        </div>
      </>
    );
  };

export default Fridge;