import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Head from "next/head";
import { getData } from "@/utils/dbManager";

import styles from "./Home.module.scss";
import Button from "@/components/Button";
import { LuMenu, LuUser } from "react-icons/lu";
import CardHeroSwiper from "@/components/CardHeroSwiper";
import CategoriesSwiper from "@/components/CategoriesSwiper";
import { useState, useEffect } from "react";
import SectionPage from "@/components/SectionPage";
import Menu from "@/components/menu";
import { useRouter } from "next/router";
import recipe from "./recipe/[id]";


export default function Home({ area, lambRecepies, categories }) {
  const sections = [
    {
      title: "Mediterranean recepies",
      exploreto: "/a-italian",
      category: area,
    },
    {
      title: "Latest recepies",
      exploreto: "/i-lamb",
      category: lambRecepies,
    },
  ];
  // const currentHours = new Date().getHours()
  const currentHours = 19
  // console.log(recipe);
  // VARIABLES ----------------

  const router = useRouter();
  // CONDITIONS ---------------
  const [pageTitle, setPageTitle] = useState("Welcome!");
  const [pageSubtitle, setPageSubtitle] = useState("Sottotitolo pagina");
  const [isMenuOpen, setMenuOpen] = useState(false);
  useEffect(() => {

    if (currentHours >= 7 < 12) {
      setPageSubtitle("What are you cooking for breakfast?");
    } else if (currentHours >= 12 < 15) {
      setPageSubtitle("What are you cooking for lunch?")
    } else if (currentHours >= 19 < 22) {
      setPageSubtitle("What are you cooking for dinner?")
    } else {
      setPageSubtitle("What are you cooking?"); 
    }
  }, [])
  // FUNCTIONS ----------------
  const hendleMenuButton = () => {
    console.log("hendleMenuButton");
    setMenuOpen(!isMenuOpen);
  };

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
          <div className={styles.responsive}>
            {/* RESPONSIVE */}
            <div className={styles.responsiveFilter}>
              <div className="page-header">
                <h1>{pageTitle}</h1>
                <p>{pageSubtitle}</p>
              </div>

              {/* ------ INIZIO CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
              <div className={`${styles.section} ${styles.section_padding}  `}>
                <SearchBar />
              </div>
              {/* <div className={styles.filter}>
                <FiltersDesktop />
              </div> */}
            </div>
            {/*------------  END RESPONSIVE ------------ */}
            {/* ----------------------- */}
            <div className={styles.responsiveMain}>
              <div className={styles.section}>
                <CardHeroSwiper />
              </div>
              {/* ----------------------- */}
              <div className={styles.section}>
                <CategoriesSwiper categories={categories} />
              </div>
              {/* ----------------------- */}
              {sections.map((sect, index) => (
                <div className={styles.section} key={index + "homeSection"}>
                  <SectionPage sections={sect} />
                </div>
              ))}
            </div>
          </div>

          {/* ------ FINE CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
        </main>
      </div>

      {/* --------- MODALS & EXTRAS -------- */}
      <Menu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}

export async function getServerSideProps() {
  const categories = await getData.categories();
  const area = await getData.area("Italian");
  const lambRecepies = await getData.ingridient("lamb");

  return {
    props: {
      categories,
      area: area.meals,
      lambRecepies: lambRecepies.meals,
    },
  };
}
