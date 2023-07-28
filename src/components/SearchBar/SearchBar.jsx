import { useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';
import Button from '../Button';
import { LuSettings2, LuSearch } from "react-icons/lu";


const SearchBar = () => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  const [canSubmit, setCanSubmit] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [searchString, setSearchString] = useState("");

  const [isSearching, setIsSearching] = useState(false);
  // FUNCTIONS ----------------
  useEffect(() => {
    searchString.length !== 0 ? setCanSubmit(true) : setCanSubmit(false);
  }, [searchString]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OPEN FILTERED PAGE WITH THIS SEARCH INPUT : ", searchString);
  }
  // RETURN -------------------
  return (
    <div className={styles.form}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles.container}
      >
        <div className={styles.searchIcon__container}>
          {
            !canSubmit ?
              <div className={styles.searchIcon}>
                <LuSearch size={24} />
              </div>
              :
              <div className={styles.searchIcon}>
                <LuSearch size={24} />
              </div>
          }

        </div>
        <input
          onFocus={() => setIsOnFocus(true)}
          onBlur={() => setIsOnFocus(false)}
          onChange={(e) => setSearchString(e.target.value)}
          type='text'
          placeholder='Search'
          className={styles.SearchBar}
          required
        />
        <Button size="lg" icon={(size) => <LuSettings2 size={size} />} />
      </form>
      <div
        className={isOnFocus ?
          `${styles.searchResults}  ${styles.isActive}`
          :
          `${styles.searchResults}  ${styles.notActive}`}
      >
        <h1>ascdasdc</h1>
        <h1>ascdasdc</h1>
        <h1>ascdasdc</h1>
        <h1>ascdasdc</h1>
        <h1>ascdasdc</h1>
        <h1>ascdasdc</h1>
        <h1>ascdasdc</h1>
      </div>
    </div>
  );
}

export default SearchBar;