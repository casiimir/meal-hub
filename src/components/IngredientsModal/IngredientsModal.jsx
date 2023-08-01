import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LuEye, LuPlus, LuSearch, LuX } from "react-icons/lu";
import Button from "../Button";
import styles from "./IngredientsModal.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { getData } from "@/utils/dbManager";
import IngredientSearchedResult from "../IngredientSearchedResult";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthContext } from "@/context/AuthContext";

const IngredientsModal = ({ isOpen, setIsOpen }) => {
  // VARIABLES ----------------
  const { user } = useAuthContext();
  const router = useRouter();
  // CONDITIONS ---------------
  const [classMenu, setClassMenu] = useState("isClosed"); //"isOpen" | "isClosed"

  const [canSubmit, setCanSubmit] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [searchString, setSearchString] = useState("");

  const [isSearching, setIsSearching] = useState(false);
  const [dataSearched, setDataSearched] = useState();
  const [dataToShow, setDataToShow] = useState();

  const [allIngredients, setAllIngredients] = useState([]);

  const [list, setList] = useState([]);

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
      onSnapshot(doc(db, "usersIngredientsList", user?.uid), (doc) => {
        console.log("Current data: ", doc.data());
        setList(doc.data().list.reverse());
      });
      getAllIngredients();
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

  useEffect(() => {
    if (isOpen) {
      setClassMenu("isOpen");
      document.body.style.overflow = "hidden";
    } else {
      setClassMenu("isClosed");
      document.body.style.overflow = "scroll";
    }
  }, [isOpen]);

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

  const handleAddNewIngredient = () => {
    console.log("handleAddNewIngredient");
  };

  const handleOpenIngredientPage = () => {
    console.log("handleOpenIngredientPage");
  };

  // RETURN -------------------
  return (
    <div
      className={`
        ${styles.FiltersModal}
        ${styles[classMenu]}
      `}
    >
      <div className={styles.header}>
        <h3>Ingredients</h3>
        <Button
          onClick={() => setIsOpen(false)}
          type="outline"
          size="sm"
          icon={(size) => <LuX size={size} />}
        />
      </div>
      <div className={styles.FiltersModal__content}>
        <div className={styles.section}>
          <div className={styles.section__header}>
            Search ingredient to add:
          </div>
          <div className={styles.section__content}>
            <div className={styles.form}>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className={styles.container}
              >
                <div className={styles.searchIcon__container}>
                  <div
                    className={
                      isOnFocus
                        ? `${styles.searchIcon__active}`
                        : `${styles.searchIcon}`
                    }
                  >
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
                }
              >
                {isSearching ? (
                  <p>Searching ...</p>
                ) : (
                  <p>Results from default database : {dataToShow?.length}</p>
                )}

                <div className={styles.results}>
                  {dataToShow?.map((res, index) => {
                    return (
                      <div
                        key={index + res.idIngredient}
                        className="searched-element"
                      >
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
                  <Button
                    text="Edit list"
                    direction="right"
                    type="text"
                    onClick={() => router.push("/fridge/" + user?.uid)}
                  />
                </div>
                <div className={styles.ingredients__content}>
                  {list?.map((ingredient, index) => {
                    return (
                      <IngredientSearchedResult
                        key={index + "ingredientsList"}
                        callback={() => handleOpenIngredientPage(ingredient)}
                        data={ingredient}
                        icon={() => <LuEye size={24} />}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientsModal;
