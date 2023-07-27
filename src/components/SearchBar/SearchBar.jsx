import { useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';
import Button from '../Button';
import { LuSettings2, LuUploadCloud, LuSearch } from "react-icons/lu";


const SearchBar = () => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  const [canSubmit, setCanSubmit] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [searchString, setSearchString] = useState("");
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
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={styles.container}
    >
      <div className={styles.searchIcon__container}>
        {
          !canSubmit ?
            <Button
              size="md"
              type="text"
              submit={true}
              color={isOnFocus ? "primary" : "medium"}
              icon={() => <LuSearch size={24} />}
            />
            :
            <Button
              size="md"
              type="fill"
              color="primary"
              submit={true}
              icon={() => <LuUploadCloud size={22} />}
            />
        }

      </div>
      <input
        onFocus={() => setIsOnFocus(true)}
        onBlur={() => setIsOnFocus(false)}
        onChange={(e) => setSearchString(e.target.value)}
        type='text'
        placeholder='Search recipe by name'
        className={styles.SearchBar}
        required
      />
      <Button size="lg" icon={(size) => <LuSettings2 size={size} />} />
    </form>
    
  );
}

export default SearchBar;