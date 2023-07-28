import styles from "./CardFiltered.module.scss";
import { LuBookmarkPlus } from "react-icons/lu";
import { obj } from "./obj";
import Button from "../Button";

const reduceText = (text, maxLenght) => {
  if (text.length <= maxLenght) {
    return text;
  } else {
    return text.slice(0, 19) + "...";
  }
};
const CardFiltered = ({ obj }) => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  const onClick = () => console.log(obj.idMeal);
  // RETURN -------------------
  return (
    <div className={styles.CardFiltered}>
      <div className={styles.card}>
        <div className={styles.text}>
          <div className={styles.title_wrapper}>
            <p className={styles.text_title}>{reduceText(obj.strMeal)}</p>
          </div>

          <p className={styles.text_category}> {obj.strCategory}</p>
          <p className={styles.text_area}>|| "null" {obj.strArea}</p>
        </div>
        <div className={styles.buttonSave} onClick={onClick}>
          <Button
            shape={"round"}
            size={"xxs"}
            type={"fill"}
            icon={(size) => <LuBookmarkPlus size={size} />}
          />
        </div>
      </div>
      <div className={styles.image}>
        <img src={obj.strMealThumb} alt={obj.strMeal} />{" "}
      </div>
    </div>
  );
};

export default CardFiltered;
