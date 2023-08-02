import React, { useState, useEffect } from "react";
import styles from "./fridge.module.scss";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { LuMenu, LuUser } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { useAuthContext } from "@/context/AuthContext";
import { localStorageManager } from "@/utils/localStorage";
import Menu from "@/components/menu";
import { useRouter } from "next/navigation";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { getData } from "@/utils/dbManager";
import IngredientSearchedResult from "@/components/IngredientSearchedResult";
import IngredientWithRecepies from "@/components/IngredientWithRecepies";
import CardHeroRecipeSuggested from "@/components/CardHeroRecipeSuggested";

const Fridge = (props) => {
  // VARIABLES ----------------
  const { user } = useAuthContext();
  const router = useRouter();

  // CONDITIONS ---------------
  const [userLogged, setUserLogged] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [badges, setBadges] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [pageTitle, setPageTitle] = useState("Fridge");
  const [pageSubtitle, setPageSubtitle] = useState(
    "Manage your ingredients to find new recepies!"
  );
  const [animate, setAnimate] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dataSearched, setDataSearched] = useState();
  const [dataToShow, setDataToShow] = useState();
  const [allIngredients, setAllIngredients] = useState([]);
  const [list, setList] = useState([]);

  const [recipesBasedOnIng, setRecipesBasedOnIng] = useState();

  // FUNCTIONS ----------------
  useEffect(() => {
    if (searchString.length !== 0) {
      setCanSubmit(true);
      handleSearchSelection(searchString);
      dataSearched === null ? handleSearch(searchString) : null;
    } else {
      setCanSubmit(false);
      setDataSearched(null);
    }
  }, [searchString]);

  useEffect(() => {
    if (user) {
      const auxData = localStorageManager.getData("user");
      setUserLogged(auxData);
      onSnapshot(doc(db, "usersIngredientsList", props?.uid), (doc) => {
        console.log("Current data: ", doc.data());
        setList(doc.data().list.reverse());
      });
      getAllIngredients();
    } else {
      setUserLogged(null);
    }
  }, [user]);

  const getAllIngredients = async () => {
    const resp = await getData.allIngredients();
    setAllIngredients(resp);
  };

  const handleSearch = async (string) => {
    setIsSearching(true);
    setDataSearched(allIngredients);
    setDataToShow(allIngredients);
    setIsSearching(false);
  };

  const handleSearchSelection = (searchedText) => {
    setDataToShow([]);
    const query = searchedText.toLowerCase();
    requestAnimationFrame(() => {
      const auxArr = [];
      allIngredients?.forEach((item) => {
        const shouldShow = item.strIngredient.toLowerCase().indexOf(query) > -1;
        shouldShow ? auxArr.push(item) : null;
      });
      setDataToShow(auxArr);
    });
  };

  const handleAddIngredient = async (ingObj) => {
    console.log("handleAddIngredient : ", user?.uid);
    const ingrediendsListRef = doc(db, "usersIngredientsList", user?.uid);
    const stringUrl = `https://www.themealdb.com/images/ingredients/${ingObj.strIngredient}.png`;
    ingObj.imgUrl = stringUrl;
    await updateDoc(ingrediendsListRef, {
      list: arrayUnion(ingObj),
    })
      .catch((err) => console.log("ERR : ", err))
      .then((res) => {
        console.log(res);
      });
    setSearchString("");
  };

  const handleRemoveThisIngredient = async (ingObj) => {
    console.log("handleAddIngredient : ", user?.uid);
    const ingrediendsListRef = doc(db, "usersIngredientsList", user?.uid);
    const stringUrl = `https://www.themealdb.com/images/ingredients/${ingObj.strIngredient}.png`;
    ingObj.imgUrl = stringUrl;
    await updateDoc(ingrediendsListRef, {
      list: arrayRemove(ingObj),
    })
      .catch((err) => console.log("ERR : ", err))
      .then((res) => {
        console.log(res);
      });
  };

  const handleOpenIngredientPage = (ingredientName) => {
    console.log("handleOpenIngredientPage");
    router.push("/ingredient/" + ingredientName);
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 400);
  }, []);

  useEffect(() => {
    searchString.length !== 0 ? setCanSubmit(true) : setCanSubmit(false);
  }, [searchString]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchString.length !== 0) {
      setBadges([...badges, searchString]);
      setSearchString("");
    }
  };

  useEffect(() => {
    if (list.length > 0) {
      getCombined();
    }
  }, [list]);

  const getCombined = async () => {
    const arrayActual = [];
    console.log(list);
    list.forEach((elem) => {
      arrayActual.push(elem.strIngredient);
    });
    const recipesRef = collection(db, "recipes");
    const q = query(
      recipesRef,
      where("arrayIngredients", "array-contains-any", arrayActual)
    );
    const querySnapshot = await getDocs(q);
    const aux = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      aux.push(doc.data());
    });
    setRecipesBasedOnIng(aux);
  };

  // if (!user) {
  //   return router.push("/login");
  // }
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
                onClick={() => setMenuOpen(!isMenuOpen)}
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
          <div className="page-header">
            <h1>{pageTitle}</h1>
            <p>{pageSubtitle}</p>
          </div>

          {/* ------ INIZIO CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
          <div className={styles.Fridge}>
            <div className={styles.FiltersModal__content}>
              <div className={styles.section}>
                <div className={styles.section__header}>
                  <h3>Search ingredient to add:</h3>
                </div>
                <div className={styles.section__content}>
                  <div className={styles.form}>
                    <form
                      onSubmit={(e) => handleSubmit(e)}
                      className={styles.container}>
                      <div className={styles.searchIcon__container}>
                        <div
                          className={
                            isOnFocus
                              ? `${styles.searchIcon__active}`
                              : `${styles.searchIcon}`
                          }>
                          <LuSearch size={24} />
                        </div>
                      </div>
                      <input
                        onFocus={() => setIsOnFocus(true)}
                        onBlur={() => setIsOnFocus(false)}
                        onChange={(e) => setSearchString(e.target.value)}
                        type="text"
                        value={searchString}
                        placeholder="Search"
                        className={styles.SearchBar}
                        required
                      />
                    </form>
                    <div
                      className={
                        canSubmit
                          ? `${styles.searchResults}  ${styles.isActive}`
                          : `${styles.searchResults}  ${styles.notActive}`
                      }>
                      {isSearching ? (
                        <p>Searching ...</p>
                      ) : (
                        <p>
                          Results from default database : {dataToShow?.length}
                        </p>
                      )}

                      <div className={styles.results}>
                        {dataToShow?.map((res, index) => {
                          return (
                            <div
                              key={index + res.idIngredient}
                              className="searched-element">
                              <IngredientSearchedResult
                                callback={() => handleAddIngredient(res)}
                                data={res}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className={styles.ingredients__container}>
                      <div className={styles.ingredients__container__header}>
                        <h4>Ingredients list: {list.length}</h4>
                      </div>
                      <div className={styles.ingredients__content}>
                        {list?.map((ingredient, index) => {
                          return (
                            <IngredientWithRecepies
                              key={index + "ingredientsList"}
                              callback2={() => {
                                handleRemoveThisIngredient(ingredient);
                              }}
                              callback={() =>
                                handleOpenIngredientPage(
                                  ingredient.strIngredient
                                )
                              }
                              data={ingredient}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.section__header__recipe}>
                  <h3>
                    Recipes based on what you have: {recipesBasedOnIng?.length}
                  </h3>
                </div>
                <div className={styles.section__content__cards}>
                  {recipesBasedOnIng?.map((recipe, index) => {
                    return (
                      <CardHeroRecipeSuggested data={recipe} list={list} />
                    );
                  })}
                </div>
              </div>
            </div>
            {/* <div className={styles.wrapper}>
              <div
                className={`${styles.circle} ${
                  animate ? styles.animate : ""
                } `}></div>{" "}
            </div> */}
          </div>

          {/* ------ FINE CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
        </main>
      </div>
      {/* --------- MODALS & EXTRAS -------- */}
      <Menu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Fridge;

export async function getServerSideProps(context) {
  // VARIABLES ----------------------------
  const uid = context.query.uid;
  // RETURN ----------------------------
  return {
    props: {
      uid,
    },
  };
}
