import { useRouter } from "next/navigation";
import Button from "../Button";
import styles from "./SearchedResult.module.scss";

const SearchedResults = ({ data }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  const handleOpenRecipePage = () => {
    router.push("/recipe/" + data.idMeal);
  };
  // RETURN -------------------
  return (
    <div
      onClick={() => handleOpenRecipePage()}
      className={styles.SearchedResult}
    >
      <div className={styles.img__container}>
        <img
          className={styles.img}
          src={data.strMealThumb}
          alt={data.strMeal}
        />
      </div>
      <div className={styles.data__container}>
        <h5>{data.strMeal}</h5>
        <p>{data.strCategory}</p>
      </div>
      <div className={styles.cta__container}>
        <Button size="xs" onClick={() => handleOpenRecipePage()} />
      </div>
    </div>
  );
};

export default SearchedResults;
