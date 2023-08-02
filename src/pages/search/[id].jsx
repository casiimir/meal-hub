import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./Search.module.scss";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { LuArrowLeft } from "react-icons/lu";
import CardGrid from "@/components/cardGrid";
import { getData } from "@/utils/dbManager";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";
import FloatingActionButton from "@/components/FloatingActionButton";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

const Search = (props) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  const [pageTitle, setPageTitle] = useState(props.title);
  const [data, setData] = useState(props.resp);
  const [isCustom, setIsCustom] = useState(props.isCustom);
  const [filterAll, setFilterAll] = useState(null);
  // FUNCTIONS ----------------
  useEffect(() => {
    if (isCustom === true || router.query.isCustom === "true") {
      setIsCustom(true);
      setPageTitle("Custom filter");
      customSearch({
        nation: router.query.nation,
        categories: router.query.categories,
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (filterAll !== null) {
      customSearch(filterAll);
    }
  }, [filterAll]);

  const customSearch = async (filters) => {
    const auxRespArray = [];
    if (filters.nation === "All") {
      if (typeof filters.categories === "string") {
        const q = query(
          collection(db, "recipes"),
          where("strCategory", "==", filters.categories)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          auxRespArray.push(doc.data());
        });
      } else {
        const q = query(
          collection(db, "recipes"),
          where("strCategory", "in", filters.categories)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          auxRespArray.push(doc.data());
        });
      }
    } else {
      const q = query(
        collection(db, "recipes"),
        where("strArea", "==", filters.nation)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const auxData = doc.data();
        if (typeof filters.categories === "string") {
          if (auxData.strCategory.includes(filters.categories))
            auxRespArray.push(doc.data());
        } else {
          filters.categories.forEach((cat) => {
            if (auxData.strCategory.includes(cat)) {
              auxRespArray.push(doc.data());
            }
          });
        }
      });
    }
    const auxPromise = await Promise.all(auxRespArray);
    setData(auxPromise);
  };

  const handleGoBack = () => {
    router.push("/");
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
      <div className={styles.Search}>
        <main>
          {/* ------------ NAVBAR ------------ */}
          <Navbar
            leftButton={
              <Button
                icon={() => <LuArrowLeft size={24} />}
                type="text"
                color="dark"
                onClick={() => handleGoBack()}
              />
            }
            pageTitle={pageTitle}
            rightButton={null}
          />
          {/* ----------- HEADER ------------- */}
          <div className="page-header">
            <h1>{pageTitle}</h1>
            <p>Total recipes : {data?.length}</p>
          </div>
          {/* RESPONSIVE PART */}
          <div className={styles.responsive}>
            {/* ----------- SEARCH BAR ------------- */}
            <div className={styles.responsiveFilter}>
              <div className={styles.search__container}>
                <SearchBar setFilterAll={setFilterAll} />
                <FloatingActionButton />
              </div>
            </div>
            {/* ------ INIZIO CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
            <div className={styles.responsiveMain}>
              <div className={styles.Search__grid}>
                {data?.map((obj, index) => {
                  return <CardGrid data={obj} key={index + "SearchPage"} />;
                })}
              </div>
            </div>
          </div>
          {/* ------ FINE CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
        </main>
      </div>
    </>
  );
};

export default Search;

export async function getServerSideProps(context) {
  // VARIABLES ----------------------------
  const contextQuery = context.query;
  let dbResp;

  // FUNCTIONS ----------------------------
  // Resolve query -----------
  const stringQuery = contextQuery.id;
  const typeQuery = stringQuery.charAt(0);
  const search = stringQuery.slice(2);
  const promises = [];
  let isCustom = false;
  // Switch call to api based on
  switch (typeQuery) {
    case "a":
      const dataArea = await getData.area(search);
      dbResp = dataArea;
      break;
    case "c":
      const dataCategory = await getData.category(search);
      dbResp = dataCategory;
      break;

    case "i":
      const dataIngridients = await getData.ingridient(search);
      dbResp = dataIngridients;
      break;

    case "f":
      const dataLetter = await getData.letter(search);
      dbResp = dataLetter;
      break;
    case "k":
      isCustom = true;
      dbResp = [];
      break;

    default:
      console.log("Query sbagliata");
      dbResp = [];
      break;
  }
  // RETURN ----------------------------
  return {
    props: {
      resp: dbResp,
      title: search,
      isCustom: isCustom,
    },
  };
}
