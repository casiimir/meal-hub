import { useEffect, useState } from "react";
import styles from "./SearchBar.module.scss";
import Button from "../Button";
import { LuSettings2, LuSearch } from "react-icons/lu";
import { getData } from "@/utils/dbManager";
import SearchedResult from "../searchedResult";
import FiltersModal from "../FiltersModal";

const SearchBar = ({ setFilterAll }) => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  const [canSubmit, setCanSubmit] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [searchString, setSearchString] = useState("");

  const [isSearching, setIsSearching] = useState(false);
  const [dataSearched, setDataSearched] = useState();
  const [dataToShow, setDataToShow] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OPEN FILTERED PAGE WITH THIS SEARCH INPUT : ", searchString);
  };

  const handleSearch = async (string) => {
    setIsSearching(true);
    const data = await getData.letter(string.charAt(0));
    setDataSearched(data);
    setDataToShow(data);
    setIsSearching(false);
  };

  const handleSearchSelection = (searchedText) => {
    setDataToShow([]);
    const query = searchedText.toLowerCase();
    requestAnimationFrame(() => {
      const auxArr = [];
      dataSearched?.forEach((item) => {
        const shouldShow = item.strMeal.toLowerCase().indexOf(query) > -1;
        shouldShow ? auxArr.push(item) : null;
      });
      setDataToShow(auxArr);
    });
  };

  // RETURN -------------------
  return (
    <>
      <div className={styles.form}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.container}>
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
            placeholder="Search"
            className={styles.SearchBar}
            required
          />
          <div className={styles.desktopQuery}>
            <Button
              onClick={() => setIsModalOpen(!isModalOpen)}
              size="lg"
              icon={(size) => <LuSettings2 size={size} />}
            />
          </div>
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
                <div key={index + res.idMeal} className="searched-element">
                  <SearchedResult data={res} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* ----- */}
      <FiltersModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        setFilter={setFilterAll}
      />
    </>
  );
};

export default SearchBar;
