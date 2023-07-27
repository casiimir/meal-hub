import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Head from "next/head";

import styles from './Home.module.scss';
import Button from "@/components/Button";
import { LuMenu, LuUser } from "react-icons/lu";
import CardHeroSwiper from "@/components/CardHeroSwiper";
import CategoriesSwiper from "@/components/CategoriesSwiper";
import { useState } from "react";
import SectionPage from "@/components/SectionPage";
import Menu from "@/components/menu";
import { useRouter } from "next/router";


export default function Home() {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  const [pageTitle, setPageTitle] = useState("Welcome!");
  const [pageSubtitle, setPageSubtitle] = useState("Sottotitolo pagina");
  const [isMenuOpen, setMenuOpen] = useState(false);
  // FUNCTIONS ----------------
  const hendleMenuButton = () => {
    console.log("hendleMenuButton");
    setMenuOpen(!isMenuOpen);
  }
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
                onClick={() => hendleMenuButton()}
              />
            }
            pageTitle={pageTitle}
            rightButton={
              <Button
                icon={() => <LuUser size={24} />}
                type="text"
                color="dark"
                onClick={() => router.push("/profile")}
              />
            }
          />
          {/* ----------- HEADER ------------- */}
          <div className="page-header">
            <h1>
              {pageTitle}
            </h1>
            <p>
              {pageSubtitle}
            </p>
          </div>


          {/* ------ INIZIO CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
          <div className={`${styles.section} ${styles.section_padding}`}>
            <SearchBar />
          </div>
          {/* ----------------------- */}
          <div className={styles.section}>
            <CardHeroSwiper />
          </div>
          {/* ----------------------- */}
          <div className={styles.section}>
            <CategoriesSwiper />
          </div>
          {/* ----------------------- */}
          <div className={styles.section}>
            <SectionPage

            />
          </div>

          {/* ------ FINE CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
        </main>
      </div>


      {/* --------- MODALS & EXTRAS -------- */}
      <Menu
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
      />
    </>
  );
}
