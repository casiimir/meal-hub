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
import { useAuthContext } from "@/context/AuthContext";
import { localStorageManager } from "@/utils/localStorage";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function Home({ area, lambRecepies, categories, heroData }) {
  // VARIABLES ----------------
  const { user } = useAuthContext();
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
  const currentHours = new Date().getHours()

  // VARIABLES ----------------

  const router = useRouter();
  // CONDITIONS ---------------
  const [pageTitle, setPageTitle] = useState("Welcome!");
  const [pageSubtitle, setPageSubtitle] = useState(
    "Login to unlock all funcionalities!"
  );
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userLogged, setUserLogged] = useState(null);
  useEffect(() => {
    if (currentHours >= 7 && currentHours < 12) {
      setPageSubtitle("What are you cooking for breakfast?");
    } else if (currentHours >= 12 && currentHours <= 15) {
      setPageSubtitle("What are you cooking for lunch?");
    } else if (currentHours >=18 && currentHours  <= 22) {
      setPageSubtitle("What are you cooking for dinner?");
    } else {
      setPageSubtitle("What are you cooking?");
    }
  }, []);

  // FUNCTIONS ----------------
  const hendleMenuButton = () => {
    console.log("hendleMenuButton");
    setMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    console.log(user);
    if (user) {
      const auxData = localStorageManager.getData("user");
      setUserLogged(auxData);
      console.log("user local data : ", auxData);
      setPageTitle("Welcome back!");
      setPageSubtitle("Nice to see you again " + auxData.name);
    } else {
      setUserLogged(null);
    }
  }, [user]);

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
                text={userLogged?.name}
                direction="right"
                onClick={
                  user?.uid
                    ? () => router.push("/profile/" + user?.uid)
                    : () => router.push("/login")
                }
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
                <CardHeroSwiper data={heroData} />
              </div>
              {/* ----------------------- */}
              <div className={styles.section}>
                <CategoriesSwiper categories={categories} />
              </div>
              {/* ----------------------- */}
              {sections?.map((sect, index) => (
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
      <FloatingActionButton />
    </>
  );
}

export async function getServerSideProps() {
  let heroData, categories, area, lambRecepies;
  try {
    heroData = await getData.category("Pasta");
    categories = await getData.categories();
    area = await getData.area("Italian");
    lambRecepies = await getData.ingridient("lamb");
  } catch (error) {
    console.log("ERROR", error);
  }

  console.log(heroData, categories, area, lambRecepies);

  return {
    props: {
      heroData,
      categories,
      area,
      lambRecepies,
    },
  };
}
