import styles from "./FilteredCard.module.scss";
import { obj } from "./obj";
const reduceText = (text, maxLenght) => {
  if (text.length <= maxLenght) {
    return text;
  } else {
    return text.slice(0, 20) + "...";
  }
};
const FilteredCard = () => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  // RETURN -------------------
  return (
    <div className={styles.FilteredCard}>
      <div className={styles.card}>
        <div className={styles.text}>
          <div className={styles.title_wrapper}>
            <p className={styles.text_title}>{reduceText(obj.strMeal)}</p>
          </div>

          <p className={styles.text_category}> {obj.strCategory}</p>
          <p className={styles.text_area}> {obj.strArea}</p>
        </div>
        <div className={styles.buttonSave}> save</div>
      </div>
      <div className={styles.image}>
        <img src={obj.strMealThumb} alt={obj.strMeal} />{" "}
      </div>
    </div>
  );
};

export default FilteredCard;
