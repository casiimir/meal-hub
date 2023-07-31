import Button from "../Button";
import styles from "./CardHero.module.scss";

import { LuBookmarkPlus } from "react-icons/lu";

const CardHero = ({ data }) => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  const handleSaveThisContent = () => {
    console.log("handleSaveThisContent : ", data.idMeal);
  };
  // RETURN -------------------
  return (
    <div
      className={styles.CardHero}
      style={{ backgroundImage: `url(${data.strMealThumb})` }}
    >
      <div className={styles.CardHero__gradient}>
        <div className={styles.header}>
          <Button
            shape="round"
            size="xxs"
            width="40"
            icon={(size) => <LuBookmarkPlus size={20} />}
            onClick={() => handleSaveThisContent()}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.card__title}>{data.strMeal}</h3>
          <p className={styles.card__subtitle}>{data.strCategory}</p>
        </div>
      </div>
    </div>
  );
};

export default CardHero;
